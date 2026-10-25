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

  // src/popup/popup.ts
  var activeTabsByDomain = {};
  var proxyIncludedDomains = [];
  var isGlobalMode = false;
  function updateStatusIndicator(enabled, isProxyConfigured, globalMode) {
    const indicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");
    const banner = document.getElementById("global-banner");
    if (!indicator || !statusText) return;
    if (enabled && isProxyConfigured) {
      indicator.className = "status-pill active";
      if (globalMode) {
        statusText.textContent = getTranslation("statusOnAll");
        if (banner) banner.style.display = "flex";
      } else {
        statusText.textContent = getTranslation("statusOnSelective");
        if (banner) banner.style.display = "none";
      }
    } else {
      indicator.className = "status-pill inactive";
      statusText.textContent = getTranslation("statusOff");
      if (banner) banner.style.display = "none";
    }
  }
  function loadUI() {
    chrome.storage.local.get(["proxyConfig", "enabled", "globalMode", "includedDomains"], (data) => {
      const isProxyConfigured = !!data.proxyConfig;
      const enabled = data.enabled !== false;
      isGlobalMode = data.globalMode === true;
      proxyIncludedDomains = data.includedDomains || [];
      const mainToggle = document.getElementById("main-toggle");
      if (mainToggle) {
        mainToggle.checked = enabled;
      }
      const globalToggle = document.getElementById("global-toggle");
      if (globalToggle) {
        globalToggle.checked = isGlobalMode;
      }
      updateStatusIndicator(enabled, isProxyConfigured, isGlobalMode);
      chrome.tabs.query({}, (tabs) => {
        activeTabsByDomain = {};
        tabs.forEach((tab) => {
          try {
            if (!tab.url) return;
            const urlObj = new URL(tab.url);
            if (!urlObj.protocol.startsWith("http")) return;
            const domain = urlObj.hostname;
            if (!activeTabsByDomain[domain]) {
              activeTabsByDomain[domain] = 0;
            }
            activeTabsByDomain[domain]++;
          } catch (e) {
          }
        });
        renderDomainList();
      });
    });
  }
  function renderDomainList() {
    const container = document.getElementById("domain-list");
    const addedContainer = document.getElementById("added-domains-list");
    const searchInput = document.getElementById("search-tabs");
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : "";
    if (!container || !addedContainer) return;
    const filteredIncluded = proxyIncludedDomains.filter((d) => d.includes(searchVal));
    if (filteredIncluded.length === 0) {
      const emptyMsg = searchVal ? getTranslation("noChosenDomainsSearch") : getTranslation("noChosenDomains");
      addedContainer.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    } else {
      addedContainer.innerHTML = "";
      filteredIncluded.forEach((domain) => {
        const div = document.createElement("div");
        div.className = "domain-item";
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
    const domains = Object.keys(activeTabsByDomain);
    const filteredDomains = domains.filter((d) => d.includes(searchVal));
    if (filteredDomains.length === 0) {
      const emptyMsg = searchVal ? getTranslation("noOpenDomainsSearch") : getTranslation("noOpenDomains");
      container.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    } else {
      container.innerHTML = "";
      filteredDomains.forEach((domain) => {
        const count = activeTabsByDomain[domain];
        const isIncluded = proxyIncludedDomains.includes(domain);
        const div = document.createElement("div");
        div.className = "domain-item";
        div.innerHTML = `
        <div class="domain-info">
          <span class="domain-name">${escapeHtml(domain)}</span>
          <span class="tab-count">${getTranslation("openTabsCount", { count })}</span>
        </div>
        <label class="switch">
          <input type="checkbox" class="domain-toggle" data-domain="${escapeHtml(domain)}" ${isIncluded ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      `;
        container.appendChild(div);
      });
    }
    document.querySelectorAll(".domain-toggle").forEach((toggle) => {
      toggle.addEventListener("change", (e) => {
        const target = e.target;
        const domain = target.getAttribute("data-domain");
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
          chrome.runtime.sendMessage({ action: "updateProxySettings" }, () => {
            renderDomainList();
          });
        });
      });
    });
  }
  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function handleAddActiveTabDomain() {
    const addButton = document.getElementById("add-domain-btn");
    if (addButton) addButton.disabled = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs && tabs[0];
      let domain = "";
      try {
        const url = new URL(tab && tab.url ? tab.url : "");
        if (url.protocol === "http:" || url.protocol === "https:") {
          domain = url.hostname.toLowerCase();
        }
      } catch (e) {
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
        chrome.runtime.sendMessage({ action: "updateProxySettings" }, () => {
          if (addButton) addButton.disabled = false;
          renderDomainList();
        });
      });
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initI18n(() => {
      loadUI();
    });
    const mainToggle = document.getElementById("main-toggle");
    if (mainToggle) {
      mainToggle.addEventListener("change", (e) => {
        const enabled = e.target.checked;
        chrome.storage.local.get(["proxyConfig", "globalMode"], (data) => {
          chrome.storage.local.set({ enabled }, () => {
            updateStatusIndicator(enabled, !!data.proxyConfig, data.globalMode === true);
            chrome.runtime.sendMessage({ action: "updateProxySettings" });
          });
        });
      });
    }
    const globalToggle = document.getElementById("global-toggle");
    if (globalToggle) {
      globalToggle.addEventListener("change", (e) => {
        const globalMode = e.target.checked;
        isGlobalMode = globalMode;
        chrome.storage.local.get(["proxyConfig", "enabled"], (data) => {
          const enabled = data.enabled !== false;
          chrome.storage.local.set({ globalMode }, () => {
            updateStatusIndicator(enabled, !!data.proxyConfig, globalMode);
            chrome.runtime.sendMessage({ action: "updateProxySettings" });
          });
        });
      });
    }
    const searchInput = document.getElementById("search-tabs");
    if (searchInput) {
      searchInput.addEventListener("input", renderDomainList);
    }
    const addBtn = document.getElementById("add-domain-btn");
    if (addBtn) {
      addBtn.addEventListener("click", handleAddActiveTabDomain);
    }
    const openOptionsBtn = document.getElementById("open-options-btn");
    if (openOptionsBtn) {
      openOptionsBtn.addEventListener("click", () => {
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else {
          window.open(chrome.runtime.getURL("options.html"));
        }
      });
    }
  });
})();
//# sourceMappingURL=popup.js.map
