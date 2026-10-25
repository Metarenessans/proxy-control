// Stores credentials for webRequest proxy authentication
let currentProxyConfig = null;
let cachedIncludedDomains = []; // Cache for quick lookup in webRequest

// Discovered domains in memory
let discoveredDomainsSet = new Set();

// Immediately preload credentials and state upon Service Worker start
chrome.storage.local.get(['proxyConfig', 'includedDomains', 'enabled'], (data) => {
  if (data.proxyConfig) {
    currentProxyConfig = data.proxyConfig;
  }
  if (data.includedDomains) {
    cachedIncludedDomains = data.includedDomains;
  }
  const isEnabled = data.enabled !== false;
  ensureKeepAlive(isEnabled && !!(data.proxyConfig && data.proxyConfig.host));
});

// Offscreen Keep-Alive connection listener
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepAlive') {
    port.onMessage.addListener(() => {
      // Keep-alive heartbeat: keeps service worker alive while proxy is active
    });
  }
});

let isCreatingOffscreen = false;
async function ensureKeepAlive(enable) {
  if (!chrome.offscreen || typeof chrome.offscreen.hasDocument !== 'function') return;
  try {
    const hasDoc = await chrome.offscreen.hasDocument();
    if (enable) {
      if (!hasDoc && !isCreatingOffscreen) {
        isCreatingOffscreen = true;
        try {
          await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['BLOBS'],
            justification: 'Keep service worker active to reliably authenticate proxy requests'
          });
          console.log('[ProxyControl] Keep-alive offscreen document started.');
        } finally {
          isCreatingOffscreen = false;
        }
      }
    } else {
      if (hasDoc) {
        await chrome.offscreen.closeDocument();
        console.log('[ProxyControl] Keep-alive offscreen document closed.');
      }
    }
  } catch (err) {
    console.warn('[ProxyControl] Error managing offscreen document:', err);
  }
}

// Alarm for syncing discovered domains to storage every 5 minutes (as fallback)
chrome.alarms.create('syncDiscoveredDomains', { periodInMinutes: 5 });

let syncTimeout = null;
function triggerImmediateSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    syncDiscoveredDomains();
  }, 1000); // Sync to storage and update PAC script 1 second after last discovery
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'syncDiscoveredDomains') {
    console.log('[ProxyControl] Alarm triggered: syncing discovered domains.');
    syncDiscoveredDomains();
  }
});

function syncDiscoveredDomains() {
  if (discoveredDomainsSet.size === 0) return;
  
  chrome.storage.local.get(['discoveredDomains'], (data) => {
    let stored = data.discoveredDomains || [];
    let updated = false;
    for (let d of discoveredDomainsSet) {
      if (!stored.includes(d)) {
        stored.push(d);
        updated = true;
      }
    }
    if (updated) {
      console.log('[ProxyControl] Syncing new domains to storage:', stored);
      chrome.storage.local.set({ discoveredDomains: stored }, () => {
        discoveredDomainsSet.clear(); // Clear memory after saving
        updateProxySettings(); // Regen PAC
      });
    } else {
      discoveredDomainsSet.clear();
    }
  });
}

// Intercept requests and discover sub-resources
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // Only care if we have an initiator
    if (!details.initiator) return;
    
    try {
      const initiatorUrl = new URL(details.initiator);
      const initiatorHost = initiatorUrl.hostname;
      const requestUrl = new URL(details.url);
      const requestHost = requestUrl.hostname;
      
      // If the request is for the same host, ignore
      if (initiatorHost === requestHost || requestHost.endsWith('.' + initiatorHost)) return;
      
      // Check if initiator is in our includedDomains
      let isProxiedInitiator = cachedIncludedDomains.some(domain => 
        initiatorHost === domain || initiatorHost.endsWith('.' + domain)
      );
      
      if (isProxiedInitiator) {
        // Track the requested resource domain (if it's not already tracked)
        if (!discoveredDomainsSet.has(requestHost)) {
          console.log(`[ProxyControl] Discovered sub-resource domain "${requestHost}" from proxied initiator "${initiatorHost}"`);
          discoveredDomainsSet.add(requestHost);
          triggerImmediateSync();
        }
      }
    } catch(e) {
      console.error('[ProxyControl] Error in onBeforeRequest discovery:', e);
    }
  },
  { urls: ["<all_urls>"] }
);

// Load config and apply settings on launch
chrome.runtime.onInstalled.addListener(() => {
  console.log('[ProxyControl] Extension installed/updated. Initializing settings...');
  updateProxySettings();
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[ProxyControl] Browser started. Initializing settings...');
  updateProxySettings();
});

// Listener for settings change events
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[ProxyControl] Message received in background worker:', request);
  if (request.action === 'updateProxySettings') {
    updateProxySettings();
    sendResponse({ status: 'updated' });
  }
});

// Configure the proxy using chrome.proxy API
function updateProxySettings() {
  console.log('[ProxyControl] Fetching current config from storage to apply settings...');
  chrome.storage.local.get(['proxyConfig', 'enabled', 'globalMode', 'includedDomains', 'discoveredDomains'], (data) => {
    const proxyConfig = data.proxyConfig;
    const enabled = data.enabled !== false;
    const globalMode = data.globalMode === true;
    const includedDomains = data.includedDomains || [];
    const discoveredDomains = data.discoveredDomains || [];
    
    console.log('[ProxyControl] Loaded state:', { enabled, globalMode, includedDomainsCount: includedDomains.length, discoveredDomainsCount: discoveredDomains.length });

    // Update cache for webRequest analyzer
    cachedIncludedDomains = includedDomains;

    // Reset proxy credentials holder
    currentProxyConfig = null;

    if (!enabled || !proxyConfig || !proxyConfig.host || !proxyConfig.port) {
      console.log('[ProxyControl] Proxy is disabled or configuration is incomplete. Clearing proxy settings (DIRECT)...');
      ensureKeepAlive(false);
      chrome.proxy.settings.clear({ scope: 'regular' }, () => {
        if (chrome.runtime.lastError) {
          console.error('[ProxyControl] Error clearing proxy settings:', chrome.runtime.lastError);
        } else {
          console.log('[ProxyControl] Proxy settings cleared. Direct connection applied.');
        }
      });
      return;
    }

    // Proxy is active: ensure keep-alive worker is running
    ensureKeepAlive(true);

    // Keep proxy credentials in memory for onAuthRequired event
    currentProxyConfig = proxyConfig;
    console.log('[ProxyControl] Storing active proxy credentials for server:', `${proxyConfig.host}:${proxyConfig.port} (User: ${proxyConfig.username || 'none'})`);

    // Map config type to standard PAC return schemes:
    let pacScheme = 'PROXY';
    if (proxyConfig.type === 'socks5') {
      pacScheme = 'SOCKS5';
    } else if (proxyConfig.type === 'socks4' || proxyConfig.type === 'socks') {
      pacScheme = 'SOCKS';
    } else if (proxyConfig.type === 'https') {
      pacScheme = 'HTTPS';
    }

    let pacScript = '';

    if (globalMode) {
      pacScript = `
function FindProxyForURL(url, host) {
  if (shExpMatch(host, "localhost") || shExpMatch(host, "127.0.0.1") || host === "::1") {
    return "DIRECT";
  }
  return "${pacScheme} ${proxyConfig.host}:${proxyConfig.port}";
}
`;
    } else {
      // PAC Script generation: 
      // Route matching domains to proxy, others DIRECT.
      const AUTO_INCLUDES = {
        'youtube.com': ['googlevideo.com', 'gvt1.com', 'ytimg.com', 'ggpht.com'],
        'music.youtube.com': ['googlevideo.com', 'gvt1.com', 'ytimg.com', 'ggpht.com'],
        'chatgpt.com': ['openai.com', 'oaistatic.com', 'oaiusercontent.com'],
        'openai.com': ['chatgpt.com', 'oaistatic.com', 'oaiusercontent.com']
      };

      let expandedDomains = new Set([...includedDomains, ...discoveredDomains]);
      includedDomains.forEach(domain => {
        for (const [trigger, related] of Object.entries(AUTO_INCLUDES)) {
          if (domain === trigger || domain.endsWith('.' + trigger)) {
            related.forEach(r => expandedDomains.add(r));
          }
        }
      });
      const finalDomains = Array.from(expandedDomains);

      let pacConditions = 'if (';
      if (finalDomains.length === 0) {
        pacConditions = 'if (false';
      } else {
        const matchStatements = finalDomains.map(domain => {
          return `shExpMatch(host, "${domain}") || shExpMatch(host, "*.${domain}")`;
        });
        pacConditions += matchStatements.join(' || ');
      }
      pacConditions += `) {\n    return "${pacScheme} ${proxyConfig.host}:${proxyConfig.port}";\n  } else {\n    return "DIRECT";\n  }`;

      pacScript = `
function FindProxyForURL(url, host) {
  ${pacConditions}
}
`;
    }

    const config = {
      mode: "pac_script",
      pacScript: {
        data: pacScript
      }
    };

    console.log('[ProxyControl] Setting proxy via PAC Script. Global:', globalMode, 'Target Scheme:', pacScheme);
    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      () => {
        if (chrome.runtime.lastError) {
          console.error('[ProxyControl] Failed to set proxy settings via PAC script:', chrome.runtime.lastError);
        } else {
          console.log('[ProxyControl] Proxy settings applied successfully. Script details:\n', pacScript);
        }
      }
    );
  });
}

// Track authentication attempts per request ID to avoid retry loops on bad credentials
const authAttemptCounts = new Map();

chrome.webRequest.onCompleted.addListener(
  (details) => {
    authAttemptCounts.delete(details.requestId);
  },
  { urls: ["<all_urls>"] }
);

// Fallback to capture proxy auth failures or bad proxy state
chrome.webRequest.onErrorOccurred.addListener(
  (details) => {
    authAttemptCounts.delete(details.requestId);
    if (details.error === "net::ERR_PROXY_CONNECTION_FAILED" || details.error === "net::ERR_TUNNEL_CONNECTION_FAILED") {
      console.warn(`[ProxyControl] Proxy network connection error detected ("${details.error}") for URL: ${details.url}. Re-applying configuration...`);
      updateProxySettings();
    }
  },
  { urls: ["<all_urls>"] }
);

// Proxy Authentication
chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    console.log('[ProxyControl] onAuthRequired triggered. Challenge details:', {
      isProxy: details.isProxy,
      scheme: details.scheme,
      challenger: details.challenger,
      url: details.url,
      requestId: details.requestId
    });

    // Only authenticate for proxy challenges
    if (!details.isProxy) {
      callback();
      return;
    }

    const attempts = (authAttemptCounts.get(details.requestId) || 0) + 1;
    authAttemptCounts.set(details.requestId, attempts);

    // If already challenged more than 2 times for the same request, credentials were not accepted
    if (attempts > 2) {
      console.warn('[ProxyControl] Authentication failed after 2 attempts for requestId:', details.requestId);
      authAttemptCounts.delete(details.requestId);
      callback();
      return;
    }

    const provideAuth = (cfg) => {
      if (cfg && cfg.username && cfg.password) {
        console.log('[ProxyControl] Supplying stored proxy credentials for authentication:', cfg.username);
        callback({
          authCredentials: {
            username: cfg.username,
            password: cfg.password
          }
        });
        return true;
      }
      return false;
    };

    // 1. Immediately provide credentials if already in memory
    if (currentProxyConfig && provideAuth(currentProxyConfig)) {
      return;
    }

    // 2. If memory was wiped during cold wake-up, fetch from storage asynchronously
    // DO NOT call callback() empty before checking storage!
    chrome.storage.local.get(['proxyConfig'], (data) => {
      if (data.proxyConfig) {
        currentProxyConfig = data.proxyConfig;
        if (provideAuth(data.proxyConfig)) {
          return;
        }
      }
      console.warn('[ProxyControl] No matching proxy credentials found in storage for challenge.');
      callback();
    });
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
);



