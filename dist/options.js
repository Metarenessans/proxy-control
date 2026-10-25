"use strict";
(() => {
  // src/i18n/index.ts
  var I18N_DATA = {
    ru: {
      // Popup
      statusOff: "\u0412\u044B\u043A\u043B",
      statusOnAll: "\u0412\u043A\u043B (\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B)",
      statusOnSelective: "\u0412\u043A\u043B (\u0412\u044B\u0431\u043E\u0440\u043E\u0447\u043D\u043E)",
      enableProxy: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u0440\u043E\u043A\u0441\u0438-\u0441\u0435\u0440\u0432\u0435\u0440",
      enableProxyDesc: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0432\u044B\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u043A\u0441\u0438",
      globalMode: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C",
      globalModeDesc: "\u041F\u0440\u043E\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u0430\u0439\u0442\u044B (\u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435)",
      globalBannerText: "\u0412\u0435\u0441\u044C \u0442\u0440\u0430\u0444\u0438\u043A \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u043A\u0441\u0438",
      searchPlaceholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0434\u043E\u043C\u0435\u043D\u0430\u043C...",
      addCurrentTabDomain: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u043E\u043C\u0435\u043D \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0438",
      chosenProxyDomains: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u043A\u0441\u0438-\u0434\u043E\u043C\u0435\u043D\u044B",
      allOpenDomains: "\u0412\u0441\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u0434\u043E\u043C\u0435\u043D\u044B",
      noChosenDomains: "\u041D\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043C\u0435\u043D\u043E\u0432",
      noChosenDomainsSearch: "\u041D\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0434\u043E\u043C\u0435\u043D\u043E\u0432 \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443",
      noOpenDomains: "\u041D\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u0432\u043A\u043B\u0430\u0434\u043E\u043A",
      noOpenDomainsSearch: "\u041D\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u0432\u043A\u043B\u0430\u0434\u043E\u043A \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443",
      loadingTabs: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0432\u043A\u043B\u0430\u0434\u043E\u043A...",
      openTabsCount: "\u041E\u0442\u043A\u0440\u044B\u0442\u043E \u0432\u043A\u043B\u0430\u0434\u043E\u043A: {count}",
      proxySettings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u043A\u0441\u0438",
      // Options
      optionsPageTitle: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 ProxyControl",
      statusProxyOff: "\u041F\u0440\u043E\u043A\u0441\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D",
      statusProxyOnAll: "\u041F\u0440\u043E\u043A\u0441\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D (\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B)",
      statusProxyOnSelective: "\u041F\u0440\u043E\u043A\u0441\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D (\u0412\u044B\u0431\u043E\u0440\u043E\u0447\u043D\u043E)",
      currentProxy: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0440\u043E\u043A\u0441\u0438",
      tableHash: "#",
      tableType: "\u0422\u0438\u043F",
      tableIp: "IP-\u0430\u0434\u0440\u0435\u0441",
      tablePort: "\u041F\u043E\u0440\u0442",
      tableLogin: "\u041B\u043E\u0433\u0438\u043D",
      tablePassword: "\u041F\u0430\u0440\u043E\u043B\u044C",
      tableActions: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
      proxyNotConfigured: "\u041F\u0440\u043E\u043A\u0441\u0438 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D",
      deleteAction: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
      addNewProxy: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u043A\u0441\u0438",
      proxyIpLabel: "IP-\u0430\u0434\u0440\u0435\u0441 \u043F\u0440\u043E\u043A\u0441\u0438",
      proxyIpPlaceholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, 192.168.1.1 \u0438\u043B\u0438 domain.com",
      proxyPortLabel: "\u041F\u043E\u0440\u0442 \u043F\u0440\u043E\u043A\u0441\u0438",
      proxyPortPlaceholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, 8080",
      proxyLoginLabel: "\u041B\u043E\u0433\u0438\u043D \u043E\u0442 \u043F\u0440\u043E\u043A\u0441\u0438",
      proxyLoginPlaceholder: "\u041B\u043E\u0433\u0438\u043D (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)",
      proxyPassLabel: "\u041F\u0430\u0440\u043E\u043B\u044C \u043E\u0442 \u043F\u0440\u043E\u043A\u0441\u0438",
      proxyPassPlaceholder: "\u041F\u0430\u0440\u043E\u043B\u044C (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)",
      saveProxyBtn: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u043A\u0441\u0438",
      quickImport: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u043A\u0441\u0438 (\u0431\u044B\u0441\u0442\u0440\u043E)",
      quickImportLabel: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0442\u0440\u043E\u043A\u0443 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 ip:port \u0438\u043B\u0438 ip:port@login:password",
      quickImportPlaceholder: "ip:port\n\u0438\u043B\u0438\nsocks5://username:password@ip:port\n\u0438\u043B\u0438\nhttp://ip:port@username:password",
      quickImportHint: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u0442\u0430",
      quickImportBtn: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u043A\u0441\u0438",
      toastSaved: "\u041F\u0440\u043E\u043A\u0441\u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D!",
      toastDeleted: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u043A\u0441\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u044B",
      toastFillRequired: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 IP \u0438 \u041F\u043E\u0440\u0442",
      toastEnterString: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0442\u0440\u043E\u043A\u0443 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u043F\u0440\u043E\u043A\u0441\u0438",
      toastInvalidFormat: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0441\u0442\u0440\u043E\u043A\u0438. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0432\u0432\u043E\u0434\u0430."
    },
    en: {
      // Popup
      statusOff: "OFF",
      statusOnAll: "ON (All sites)",
      statusOnSelective: "ON (Selective)",
      enableProxy: "Enable Proxy Server",
      enableProxyDesc: "Main proxy master switch",
      globalMode: "Global Mode",
      globalModeDesc: "Route all websites (not only selected)",
      globalBannerText: "All network traffic is routed via proxy",
      searchPlaceholder: "Search domains...",
      addCurrentTabDomain: "Add current tab domain",
      chosenProxyDomains: "Selected Proxy Domains",
      allOpenDomains: "All Open Domains",
      noChosenDomains: "No domains selected",
      noChosenDomainsSearch: "No selected domains matching query",
      noOpenDomains: "No open tabs",
      noOpenDomainsSearch: "No open tabs matching query",
      loadingTabs: "Loading tabs...",
      openTabsCount: "Open tabs: {count}",
      proxySettings: "Proxy Settings",
      // Options
      optionsPageTitle: "ProxyControl Settings",
      statusProxyOff: "Proxy Disabled",
      statusProxyOnAll: "Proxy Enabled (All sites)",
      statusProxyOnSelective: "Proxy Enabled (Selective)",
      currentProxy: "Current Proxy",
      tableHash: "#",
      tableType: "Type",
      tableIp: "IP Address",
      tablePort: "Port",
      tableLogin: "Username",
      tablePassword: "Password",
      tableActions: "Actions",
      proxyNotConfigured: "Proxy not configured",
      deleteAction: "Delete",
      addNewProxy: "Add New Proxy",
      proxyIpLabel: "Proxy IP Address",
      proxyIpPlaceholder: "e.g. 192.168.1.1 or domain.com",
      proxyPortLabel: "Proxy Port",
      proxyPortPlaceholder: "e.g. 8080",
      proxyLoginLabel: "Proxy Username",
      proxyLoginPlaceholder: "Username (optional)",
      proxyPassLabel: "Proxy Password",
      proxyPassPlaceholder: "Password (optional)",
      saveProxyBtn: "Save Proxy",
      quickImport: "Quick Proxy Import",
      quickImportLabel: "Paste string formatted as ip:port or ip:port@login:password",
      quickImportPlaceholder: "ip:port\nor\nsocks5://username:password@ip:port\nor\nhttp://ip:port@username:password",
      quickImportHint: "Automatic format detection supported",
      quickImportBtn: "Import Proxy",
      toastSaved: "Proxy successfully saved and applied!",
      toastDeleted: "Proxy settings removed",
      toastFillRequired: "Please enter IP and Port",
      toastEnterString: "Please enter a proxy configuration string",
      toastInvalidFormat: "Invalid string format. Please verify your input."
    }
  };
  var currentLang = "ru";
  function getTranslation(key, params = {}) {
    const dict = I18N_DATA[currentLang] ?? I18N_DATA.ru;
    let text = dict[key] ?? I18N_DATA.ru[key] ?? key;
    for (const [pKey, pVal] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
    }
    return text;
  }
  function applyI18nToDOM() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) {
        el.textContent = getTranslation(key);
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key) {
        el.placeholder = getTranslation(key);
      }
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key) {
        el.title = getTranslation(key);
      }
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      if (btn.getAttribute("data-lang") === currentLang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
  function setLanguage(lang, onLangChangeCallback) {
    if (lang !== "ru" && lang !== "en") lang = "ru";
    currentLang = lang;
    chrome.storage.local.set({ language: lang }, () => {
      applyI18nToDOM();
      if (onLangChangeCallback) {
        onLangChangeCallback(currentLang);
      }
    });
  }
  function initI18n(onLangChangeCallback) {
    chrome.storage.local.get(["language"], (res) => {
      if (res && (res.language === "en" || res.language === "ru")) {
        currentLang = res.language;
      } else {
        const browserLang = (navigator.language || "").toLowerCase();
        currentLang = browserLang.startsWith("ru") ? "ru" : "en";
      }
      applyI18nToDOM();
      document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const selectedLang = btn.getAttribute("data-lang");
          if (selectedLang && selectedLang !== currentLang) {
            setLanguage(selectedLang, onLangChangeCallback);
          }
        });
      });
      if (onLangChangeCallback) {
        onLangChangeCallback(currentLang);
      }
    });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.language) {
        const newLang = changes.language.newValue;
        if (newLang && newLang !== currentLang) {
          currentLang = newLang;
          applyI18nToDOM();
          if (onLangChangeCallback) {
            onLangChangeCallback(currentLang);
          }
        }
      }
    });
  }

  // src/options/options.ts
  function showToast(message, isSuccess = true) {
    const toast = document.getElementById("toast");
    const msgEl = document.getElementById("toast-message");
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    if (isSuccess) {
      toast.style.borderColor = "var(--accent-color)";
    } else {
      toast.style.borderColor = "var(--danger-color)";
    }
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3e3);
  }
  function loadProxySettings() {
    chrome.storage.local.get(["proxyConfig", "enabled", "globalMode"], (data) => {
      const tbody = document.getElementById("proxy-list-body");
      const indicator = document.getElementById("status-indicator");
      const statusText = document.getElementById("status-text");
      if (!tbody || !indicator || !statusText) return;
      if (data.enabled !== false && data.proxyConfig) {
        indicator.className = "status-pill active";
        statusText.textContent = data.globalMode ? getTranslation("statusProxyOnAll") : getTranslation("statusProxyOnSelective");
      } else {
        indicator.className = "status-pill inactive";
        statusText.textContent = getTranslation("statusProxyOff");
      }
      if (data.proxyConfig) {
        const cfg = data.proxyConfig;
        tbody.innerHTML = `
        <tr>
          <td>1</td>
          <td>${cfg.type ? cfg.type.toUpperCase() : "HTTP"}</td>
          <td>${escapeHtml(cfg.host)}</td>
          <td>${cfg.port}</td>
          <td>${escapeHtml(cfg.username || "-")}</td>
          <td>${cfg.password ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "-"}</td>
          <td>
            <button class="action-btn delete" id="delete-proxy-btn" title="${getTranslation("deleteAction")}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </td>
        </tr>
      `;
        const deleteBtn = document.getElementById("delete-proxy-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", deleteProxy);
        }
        const ipInput = document.getElementById("proxy-ip");
        const portInput = document.getElementById("proxy-port");
        const loginInput = document.getElementById("proxy-login");
        const passInput = document.getElementById("proxy-password");
        if (ipInput) ipInput.value = cfg.host || "";
        if (portInput) portInput.value = String(cfg.port || "");
        if (loginInput) loginInput.value = cfg.username || "";
        if (passInput) passInput.value = cfg.password || "";
      } else {
        tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-secondary);">${getTranslation("proxyNotConfigured")}</td>
        </tr>
      `;
      }
    });
  }
  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function saveProxy(host, port, username, password, type = "http") {
    const proxyConfig = {
      host,
      port: typeof port === "number" ? port : parseInt(port, 10),
      username: username || "",
      password: password || "",
      type: type.toLowerCase()
    };
    chrome.storage.local.get(["enabled"], (data) => {
      const isEnabled = data.enabled !== void 0 ? data.enabled : true;
      chrome.storage.local.set({ proxyConfig, enabled: isEnabled }, () => {
        chrome.runtime.sendMessage({ action: "updateProxySettings" }, () => {
          showToast(getTranslation("toastSaved"));
          loadProxySettings();
        });
      });
    });
  }
  function deleteProxy() {
    chrome.storage.local.remove(["proxyConfig"], () => {
      chrome.runtime.sendMessage({ action: "updateProxySettings" }, () => {
        showToast(getTranslation("toastDeleted"));
        const ipInput = document.getElementById("proxy-ip");
        const portInput = document.getElementById("proxy-port");
        const loginInput = document.getElementById("proxy-login");
        const passInput = document.getElementById("proxy-password");
        if (ipInput) ipInput.value = "";
        if (portInput) portInput.value = "";
        if (loginInput) loginInput.value = "";
        if (passInput) passInput.value = "";
        loadProxySettings();
      });
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initI18n(() => {
      loadProxySettings();
    });
    const form = document.getElementById("proxy-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const host = document.getElementById("proxy-ip").value.trim();
        const port = document.getElementById("proxy-port").value.trim();
        const username = document.getElementById("proxy-login").value.trim();
        const password = document.getElementById("proxy-password").value.trim();
        if (!host || !port) {
          showToast(getTranslation("toastFillRequired"), false);
          return;
        }
        saveProxy(host, port, username, password, "http");
      });
    }
    const fastBtn = document.getElementById("fast-btn");
    if (fastBtn) {
      fastBtn.addEventListener("click", () => {
        const fastInput = document.getElementById("fast-import");
        if (!fastInput) return;
        let val = fastInput.value.trim();
        if (!val) {
          showToast(getTranslation("toastEnterString"), false);
          return;
        }
        let type = "http";
        const schemeRegex = /^([a-zA-Z0-9]+):\/\//;
        const match = val.match(schemeRegex);
        if (match) {
          const parsedType = match[1].toLowerCase();
          if (parsedType === "socks5" || parsedType === "socks4" || parsedType === "https" || parsedType === "http") {
            type = parsedType;
          }
          val = val.replace(schemeRegex, "");
        }
        let host = "";
        let port = "";
        let username = "";
        let password = "";
        if (val.includes("@")) {
          const parts = val.split("@");
          if (parts[0].includes(":") && parts[1].includes(":")) {
            const leftParts = parts[0].split(":");
            const rightParts = parts[1].split(":");
            if (leftParts[0].includes(".") || !isNaN(Number(leftParts[1])) && isNaN(Number(rightParts[1]))) {
              host = leftParts[0];
              port = leftParts[1];
              username = rightParts[0];
              password = rightParts[1];
            } else {
              username = leftParts[0];
              password = leftParts[1];
              host = rightParts[0];
              port = rightParts[1];
            }
          }
        } else if (val.includes(":")) {
          const parts = val.split(":");
          if (parts.length === 2) {
            host = parts[0];
            port = parts[1];
          } else if (parts.length === 4) {
            if (parts[0].includes(".")) {
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
          fastInput.value = "";
        } else {
          showToast(getTranslation("toastInvalidFormat"), false);
        }
      });
    }
  });
})();
//# sourceMappingURL=options.js.map
