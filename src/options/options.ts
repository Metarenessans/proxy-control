import { getTranslation, initI18n } from '../i18n';
import type { ProxyConfig, ProxyType, StorageData } from '../types';

// Helper to display toast notifications
function showToast(message: string, isSuccess = true): void {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;

  if (isSuccess) {
    toast.style.borderColor = 'var(--accent-color)';
  } else {
    toast.style.borderColor = 'var(--danger-color)';
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Load current proxy config from storage and display it
export function loadProxySettings(): void {
  chrome.storage.local.get(['proxyConfig', 'enabled', 'globalMode'], (data: StorageData) => {
    const tbody = document.getElementById('proxy-list-body');
    const indicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');

    if (!tbody || !indicator || !statusText) return;

    // Update global status indicator
    if (data.enabled !== false && data.proxyConfig) {
      indicator.className = 'status-pill active';
      statusText.textContent = data.globalMode ? getTranslation('statusProxyOnAll') : getTranslation('statusProxyOnSelective');
    } else {
      indicator.className = 'status-pill inactive';
      statusText.textContent = getTranslation('statusProxyOff');
    }

    if (data.proxyConfig) {
      const cfg = data.proxyConfig;
      tbody.innerHTML = `
        <tr>
          <td>1</td>
          <td>${cfg.type ? cfg.type.toUpperCase() : 'HTTP'}</td>
          <td>${escapeHtml(cfg.host)}</td>
          <td>${cfg.port}</td>
          <td>${escapeHtml(cfg.username || '-')}</td>
          <td>${cfg.password ? '••••••••' : '-'}</td>
          <td>
            <button class="action-btn delete" id="delete-proxy-btn" title="${getTranslation('deleteAction')}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </td>
        </tr>
      `;

      const deleteBtn = document.getElementById('delete-proxy-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteProxy);
      }

      // Pre-fill the form with the current/last proxy config
      const ipInput = document.getElementById('proxy-ip') as HTMLInputElement | null;
      const portInput = document.getElementById('proxy-port') as HTMLInputElement | null;
      const loginInput = document.getElementById('proxy-login') as HTMLInputElement | null;
      const passInput = document.getElementById('proxy-password') as HTMLInputElement | null;

      if (ipInput) ipInput.value = cfg.host || '';
      if (portInput) portInput.value = String(cfg.port || '');
      if (loginInput) loginInput.value = cfg.username || '';
      if (passInput) passInput.value = cfg.password || '';
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-secondary);">${getTranslation('proxyNotConfigured')}</td>
        </tr>
      `;
    }
  });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Save proxy to storage and update system
export function saveProxy(host: string, port: string | number, username?: string, password?: string, type: ProxyType = 'http'): void {
  const proxyConfig: ProxyConfig = {
    host,
    port: typeof port === 'number' ? port : parseInt(port, 10),
    username: username || '',
    password: password || '',
    type: (type.toLowerCase() as ProxyType)
  };

  chrome.storage.local.get(['enabled'], (data: StorageData) => {
    const isEnabled = data.enabled !== undefined ? data.enabled : true;
    chrome.storage.local.set({ proxyConfig, enabled: isEnabled }, () => {
      chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
        showToast(getTranslation('toastSaved'));
        loadProxySettings();
      });
    });
  });
}

// Delete current proxy config
export function deleteProxy(): void {
  chrome.storage.local.remove(['proxyConfig'], () => {
    chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
      showToast(getTranslation('toastDeleted'));
      // Clear inputs
      const ipInput = document.getElementById('proxy-ip') as HTMLInputElement | null;
      const portInput = document.getElementById('proxy-port') as HTMLInputElement | null;
      const loginInput = document.getElementById('proxy-login') as HTMLInputElement | null;
      const passInput = document.getElementById('proxy-password') as HTMLInputElement | null;

      if (ipInput) ipInput.value = '';
      if (portInput) portInput.value = '';
      if (loginInput) loginInput.value = '';
      if (passInput) passInput.value = '';
      loadProxySettings();
    });
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initI18n(() => {
    loadProxySettings();
  });

  // Handle Form Submission
  const form = document.getElementById('proxy-form') as HTMLFormElement | null;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const host = (document.getElementById('proxy-ip') as HTMLInputElement).value.trim();
      const port = (document.getElementById('proxy-port') as HTMLInputElement).value.trim();
      const username = (document.getElementById('proxy-login') as HTMLInputElement).value.trim();
      const password = (document.getElementById('proxy-password') as HTMLInputElement).value.trim();

      if (!host || !port) {
        showToast(getTranslation('toastFillRequired'), false);
        return;
      }

      saveProxy(host, port, username, password, 'http');
    });
  }

  // Handle Quick/Fast Import
  const fastBtn = document.getElementById('fast-btn');
  if (fastBtn) {
    fastBtn.addEventListener('click', () => {
      const fastInput = document.getElementById('fast-import') as HTMLTextAreaElement | null;
      if (!fastInput) return;

      let val = fastInput.value.trim();
      if (!val) {
        showToast(getTranslation('toastEnterString'), false);
        return;
      }

      let type: ProxyType = 'http';

      // Extract scheme if present (e.g. socks5:// or http://)
      const schemeRegex = /^([a-zA-Z0-9]+):\/\//;
      const match = val.match(schemeRegex);
      if (match) {
        const parsedType = match[1].toLowerCase();
        if (parsedType === 'socks5' || parsedType === 'socks4' || parsedType === 'https' || parsedType === 'http') {
          type = parsedType;
        }
        val = val.replace(schemeRegex, '');
      }

      let host = '';
      let port = '';
      let username = '';
      let password = '';

      if (val.includes('@')) {
        const parts = val.split('@');
        if (parts[0].includes(':') && parts[1].includes(':')) {
          const leftParts = parts[0].split(':');
          const rightParts = parts[1].split(':');

          if (leftParts[0].includes('.') || (!isNaN(Number(leftParts[1])) && isNaN(Number(rightParts[1])))) {
            // ip:port@login:password
            host = leftParts[0];
            port = leftParts[1];
            username = rightParts[0];
            password = rightParts[1];
          } else {
            // login:password@ip:port
            username = leftParts[0];
            password = leftParts[1];
            host = rightParts[0];
            port = rightParts[1];
          }
        }
      } else if (val.includes(':')) {
        const parts = val.split(':');
        if (parts.length === 2) {
          host = parts[0];
          port = parts[1];
        } else if (parts.length === 4) {
          if (parts[0].includes('.')) {
            host = parts[0];
            port = parts[1];
            username = parts[2];
            password = parts[3];
          } else {
            username = parts[0];
            password = parts[1];
            host = parts[2];
            port = parts[3];
          }
        }
      }

      if (host && port) {
        saveProxy(host, port, username, password, type);
        fastInput.value = '';
      } else {
        showToast(getTranslation('toastInvalidFormat'), false);
      }
    });
  }
});
