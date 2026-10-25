// Helper to display toast notifications
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
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
function loadProxySettings() {
  chrome.storage.local.get(['proxyConfig', 'enabled', 'globalMode'], (data) => {
    const tbody = document.getElementById('proxy-list-body');
    const indicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');

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

      document.getElementById('delete-proxy-btn').addEventListener('click', deleteProxy);

      // Pre-fill the form with the current/last proxy config
      document.getElementById('proxy-ip').value = cfg.host || '';
      document.getElementById('proxy-port').value = cfg.port || '';
      document.getElementById('proxy-login').value = cfg.username || '';
      document.getElementById('proxy-password').value = cfg.password || '';
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-secondary);">${getTranslation('proxyNotConfigured')}</td>
        </tr>
      `;
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Save proxy to storage and update system
function saveProxy(host, port, username, password, type = 'http') {
  const proxyConfig = { 
    host, 
    port: parseInt(port, 10), 
    username, 
    password, 
    type: type.toLowerCase() // 'http', 'https', 'socks4', 'socks5'
  };
  
  chrome.storage.local.get(['enabled'], (data) => {
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
function deleteProxy() {
  chrome.storage.local.remove(['proxyConfig'], () => {
    chrome.runtime.sendMessage({ action: 'updateProxySettings' }, () => {
      showToast(getTranslation('toastDeleted'));
      // Clear inputs
      document.getElementById('proxy-ip').value = '';
      document.getElementById('proxy-port').value = '';
      document.getElementById('proxy-login').value = '';
      document.getElementById('proxy-password').value = '';
      loadProxySettings();
    });
  });
}

// Handle Form Submission (defaulting to http)
document.getElementById('proxy-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const host = document.getElementById('proxy-ip').value.trim();
  const port = document.getElementById('proxy-port').value.trim();
  const username = document.getElementById('proxy-login').value.trim();
  const password = document.getElementById('proxy-password').value.trim();

  if (!host || !port) {
    showToast(getTranslation('toastFillRequired'), false);
    return;
  }

  saveProxy(host, port, username, password, 'http');
});

// Handle Quick/Fast Import
document.getElementById('fast-btn').addEventListener('click', () => {
  let val = document.getElementById('fast-import').value.trim();
  if (!val) {
    showToast(getTranslation('toastEnterString'), false);
    return;
  }

  let type = 'http'; // default

  // Extract scheme if present (e.g. socks5:// or http://)
  const schemeRegex = /^([a-zA-Z0-9]+):\/\//;
  const match = val.match(schemeRegex);
  if (match) {
    type = match[1].toLowerCase();
    val = val.replace(schemeRegex, ''); // Remove the scheme prefix
  }

  // Parse patterns:
  // 1) ip:port
  // 2) ip:port@login:password
  // 3) login:password@ip:port
  let host = '', port = '', username = '', password = '';
  
  if (val.includes('@')) {
    const parts = val.split('@');
    // Check if credentials are first or last
    if (parts[0].includes(':') && parts[1].includes(':')) {
      const leftParts = parts[0].split(':');
      const rightParts = parts[1].split(':');
      
      // Let's deduce. IP usually contains dots or is domain.
      if (leftParts[0].includes('.') || !isNaN(leftParts[1]) && isNaN(rightParts[1])) {
        // format is ip:port@login:password
        host = leftParts[0];
        port = leftParts[1];
        username = rightParts[0];
        password = rightParts[1];
      } else {
        // format is login:password@ip:port
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
      // ip:port:login:password or login:password:ip:port
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
    document.getElementById('fast-import').value = '';
  } else {
    showToast(getTranslation('toastInvalidFormat'), false);
  }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  initI18n(() => {
    loadProxySettings();
  });
});
