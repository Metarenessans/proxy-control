import { getTranslation, initI18n } from '../i18n';
import type { StorageData } from '../types';

let activeTabsByDomain: Record<string, number> = {};
let proxyIncludedDomains: string[] = [];
let isGlobalMode = false;

function updateStatusIndicator(enabled: boolean, isProxyConfigured: boolean, globalMode: boolean): void {
  const indicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  const banner = document.getElementById('global-banner');

  if (!indicator || !statusText) return;

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
export function loadUI(): void {
  chrome.storage.local.get(['proxyConfig', 'enabled', 'globalMode', 'includedDomains'], (data: StorageData) => {
    const isProxyConfigured = !!data.proxyConfig;
    const enabled = data.enabled !== false;
    isGlobalMode = data.globalMode === true;
    proxyIncludedDomains = data.includedDomains || [];

    // Set toggle state
    const mainToggle = document.getElementById('main-toggle') as HTMLInputElement | null;
    if (mainToggle) {
      mainToggle.checked = enabled;
    }

    const globalToggle = document.getElementById('global-toggle') as HTMLInputElement | null;
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

export function renderDomainList(): void {
  const container = document.getElementById('domain-list');
  const addedContainer = document.getElementById('added-domains-list');
  const searchInput = document.getElementById('search-tabs') as HTMLInputElement | null;
  const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (!container || !addedContainer) return;

  // 1. Render Top Section: Chosen Proxy Domains (Only those in proxyIncludedDomains)
  const filteredIncluded = proxyIncludedDomains.filter((d) => d.includes(searchVal));
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
          <span class="domain-name">${escapeHtml(domain)}</span>
        </div>
        <label class="switch">
          <input type="checkbox" class="domain-toggle" data-domain="${escapeHtml(domain)}" checked>
          <span class="slider"></span>
        </label>
      `;
      addedContainer.appendChild(div);
    });
  }

  // 2. Render Bottom Section: All Open Domains
  const domains = Object.keys(activeTabsByDomain);
  const filteredDomains = domains.filter((d) => d.includes(searchVal));

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
          <span class="domain-name">${escapeHtml(domain)}</span>
          <span class="tab-count">${getTranslation('openTabsCount', { count })}</span>
        </div>
        <label class="switch">
          <input type="checkbox" class="domain-toggle" data-domain="${escapeHtml(domain)}" ${isIncluded ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
      `;
      container.appendChild(div);
    });
  }

  // 3. Attach Toggle Event Listeners to all switches in both containers
  document.querySelectorAll<HTMLInputElement>('.domain-toggle').forEach((toggle) => {
    toggle.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const domain = target.getAttribute('data-domain');
      if (!domain) return;
      const checked = target.checked;

      if (checked) {
        if (!proxyIncludedDomains.includes(domain)) {
          proxyIncludedDomains.push(domain);
        }
      } else {
        proxyIncludedDomains = proxyIncludedDomains.filter((d) => d !== domain);
      }

      chrome.storage.local.set({ includedDomains: proxyIncludedDomains }, () => {
        chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
          renderDomainList();
        });
      });
    });
  });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Add the domain from the currently active tab
function handleAddActiveTabDomain(): void {
  const addButton = document.getElementById('add-domain-btn') as HTMLButtonElement | null;
  if (addButton) addButton.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    let domain = '';

    try {
      const url = new URL(tab && tab.url ? tab.url : '');
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        domain = url.hostname.toLowerCase();
      }
    } catch (e) {
      // Internal pages without a usable URL
    }

    if (!domain) {
      if (addButton) addButton.disabled = false;
      return;
    }

    if (proxyIncludedDomains.includes(domain)) {
      if (addButton) addButton.disabled = false;
      return;
    }

    proxyIncludedDomains.push(domain);
    chrome.storage.local.set({ includedDomains: proxyIncludedDomains }, () => {
      chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
        if (addButton) addButton.disabled = false;
        renderDomainList();
      });
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initI18n(() => {
    loadUI();
  });

  // Main toggle changed
  const mainToggle = document.getElementById('main-toggle');
  if (mainToggle) {
    mainToggle.addEventListener('change', (e) => {
      const enabled = (e.target as HTMLInputElement).checked;
      chrome.storage.local.get(['proxyConfig', 'globalMode'], (data: StorageData) => {
        chrome.storage.local.set({ enabled }, () => {
          updateStatusIndicator(enabled, !!data.proxyConfig, data.globalMode === true);
          chrome.runtime.sendMessage({ action: 'updateProxySettings' });
        });
      });
    });
  }

  // Global toggle changed
  const globalToggle = document.getElementById('global-toggle');
  if (globalToggle) {
    globalToggle.addEventListener('change', (e) => {
      const globalMode = (e.target as HTMLInputElement).checked;
      isGlobalMode = globalMode;
      chrome.storage.local.get(['proxyConfig', 'enabled'], (data: StorageData) => {
        const enabled = data.enabled !== false;
        chrome.storage.local.set({ globalMode }, () => {
          updateStatusIndicator(enabled, !!data.proxyConfig, globalMode);
          chrome.runtime.sendMessage({ action: 'updateProxySettings' });
        });
      });
    });
  }

  // Search input handler
  const searchInput = document.getElementById('search-tabs');
  if (searchInput) {
    searchInput.addEventListener('input', renderDomainList);
  }

  // Add button handler
  const addBtn = document.getElementById('add-domain-btn');
  if (addBtn) {
    addBtn.addEventListener('click', handleAddActiveTabDomain);
  }

  // Open options page
  const openOptionsBtn = document.getElementById('open-options-btn');
  if (openOptionsBtn) {
    openOptionsBtn.addEventListener('click', () => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    });
  }
});
