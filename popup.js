let activeTabsByDomain = {};
let proxyIncludedDomains = [];
let isGlobalMode = false;

function updateStatusIndicator(enabled, isProxyConfigured, globalMode) {
  const indicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  const banner = document.getElementById('global-banner');

  if (enabled && isProxyConfigured) {
    indicator.className = 'status-pill active';
    if (globalMode) {
      statusText.textContent = getTranslation('statusOnAll');
      if (banner) banner.style.display = 'flex';
    } else {
      statusText.textContent = getTranslation('statusOnSelective');
      if (banner) banner.style.display = 'none';
    }
  } else {
    indicator.className = 'status-pill inactive';
    statusText.textContent = getTranslation('statusOff');
    if (banner) banner.style.display = 'none';
  }
}

// Fetch open tabs, group by domain, and load current inclusion list
function loadUI() {
  chrome.storage.local.get(['proxyConfig', 'enabled', 'globalMode', 'includedDomains'], (data) => {
    const isProxyConfigured = !!data.proxyConfig;
    const enabled = data.enabled !== false;
    isGlobalMode = data.globalMode === true;
    proxyIncludedDomains = data.includedDomains || [];

    // Set toggle state
    const mainToggle = document.getElementById('main-toggle');
    mainToggle.checked = enabled;

    const globalToggle = document.getElementById('global-toggle');
    if (globalToggle) {
      globalToggle.checked = isGlobalMode;
    }

    updateStatusIndicator(enabled, isProxyConfigured, isGlobalMode);

    // Fetch tabs
    chrome.tabs.query({}, (tabs) => {
      activeTabsByDomain = {};
      
      tabs.forEach((tab) => {
        try {
          if (!tab.url) return;
          const urlObj = new URL(tab.url);
          // Skip chrome://, chrome-extension://, etc.
          if (!urlObj.protocol.startsWith('http')) return;
          
          const domain = urlObj.hostname;
          if (!activeTabsByDomain[domain]) {
            activeTabsByDomain[domain] = 0;
          }
          activeTabsByDomain[domain]++;
        } catch (e) {
          // invalid url
        }
      });

      renderDomainList();
    });
  });
}

function renderDomainList() {
  const container = document.getElementById('domain-list');
  const addedContainer = document.getElementById('added-domains-list');
  const searchVal = document.getElementById('search-tabs').value.toLowerCase().trim();
  
  // 1. Render Top Section: Chosen Proxy Domains (Only those in proxyIncludedDomains)
  const filteredIncluded = proxyIncludedDomains.filter(d => d.includes(searchVal));
  if (filteredIncluded.length === 0) {
    const emptyMsg = searchVal ? getTranslation('noChosenDomainsSearch') : getTranslation('noChosenDomains');
    addedContainer.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
  } else {
    addedContainer.innerHTML = '';
    filteredIncluded.forEach((domain) => {
      const div = document.createElement('div');
      div.className = 'domain-item';
      div.innerHTML = `
        <div class="domain-info">
          <span class="domain-name">${domain}</span>
        </div>
        <label class="switch">
          <input type="checkbox" class="domain-toggle" data-domain="${domain}" checked>
          <span class="slider"></span>
        </label>
      `;
      addedContainer.appendChild(div);
    });
  }

  // 2. Render Bottom Section: All Open Domains
  const domains = Object.keys(activeTabsByDomain);
  const filteredDomains = domains.filter(d => d.includes(searchVal));

  if (filteredDomains.length === 0) {
    const emptyMsg = searchVal ? getTranslation('noOpenDomainsSearch') : getTranslation('noOpenDomains');
    container.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
  } else {
    container.innerHTML = '';
    filteredDomains.forEach((domain) => {
      const count = activeTabsByDomain[domain];
      const isIncluded = proxyIncludedDomains.includes(domain);

      const div = document.createElement('div');
      div.className = 'domain-item';
      div.innerHTML = `
        <div class="domain-info">
          <span class="domain-name">${domain}</span>
          <span class="tab-count">${getTranslation('openTabsCount', { count })}</span>
        </div>
        <label class="switch">
          <input type="checkbox" class="domain-toggle" data-domain="${domain}" ${isIncluded ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      `;
      container.appendChild(div);
    });
  }

  // 3. Attach Toggle Event Listeners to all switches in both containers
  document.querySelectorAll('.domain-toggle').forEach((toggle) => {
    toggle.addEventListener('change', (e) => {
      const domain = e.target.getAttribute('data-domain');
      const checked = e.target.checked;

      if (checked) {
        if (!proxyIncludedDomains.includes(domain)) {
          proxyIncludedDomains.push(domain);
        }
      } else {
        proxyIncludedDomains = proxyIncludedDomains.filter(d => d !== domain);
      }

      chrome.storage.local.set({ includedDomains: proxyIncludedDomains }, () => {
        chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
          // Re-render UI to keep both lists perfectly synchronized
          renderDomainList();
        });
      });
    });
  });
}

// Main toggle changed
document.getElementById('main-toggle').addEventListener('change', (e) => {
  const enabled = e.target.checked;
  chrome.storage.local.get(['proxyConfig', 'globalMode'], (data) => {
    chrome.storage.local.set({ enabled: enabled }, () => {
      updateStatusIndicator(enabled, !!data.proxyConfig, data.globalMode === true);
      chrome.runtime.sendMessage({ action: 'updateProxySettings' });
    });
  });
});

// Global toggle changed
const globalToggle = document.getElementById('global-toggle');
if (globalToggle) {
  globalToggle.addEventListener('change', (e) => {
    const globalMode = e.target.checked;
    isGlobalMode = globalMode;
    chrome.storage.local.get(['proxyConfig', 'enabled'], (data) => {
      const enabled = data.enabled !== false;
      chrome.storage.local.set({ globalMode: globalMode }, () => {
        updateStatusIndicator(enabled, !!data.proxyConfig, globalMode);
        chrome.runtime.sendMessage({ action: 'updateProxySettings' });
      });
    });
  });
}

// Search input handler
document.getElementById('search-tabs').addEventListener('input', renderDomainList);

// Add the domain from the currently active tab.
function handleAddActiveTabDomain() {
  const addButton = document.getElementById('add-domain-btn');
  addButton.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    let domain = '';

    try {
      const url = new URL(tab && tab.url ? tab.url : '');
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        domain = url.hostname.toLowerCase();
      }
    } catch (e) {
      // The active tab may be a browser/internal page without a usable URL.
    }

    if (!domain) {
      addButton.disabled = false;
      return;
    }

    if (proxyIncludedDomains.includes(domain)) {
      addButton.disabled = false;
      return;
    }

    proxyIncludedDomains.push(domain);
    chrome.storage.local.set({ includedDomains: proxyIncludedDomains }, () => {
      chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
        addButton.disabled = false;
        renderDomainList();
      });
    });
  });
}

document.getElementById('add-domain-btn').addEventListener('click', handleAddActiveTabDomain);

// Open options page
document.getElementById('open-options-btn').addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  initI18n(() => {
    loadUI();
  });
});
