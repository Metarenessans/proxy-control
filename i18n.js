// i18n (Internationalization) for ProxyControl Extension
const I18N_DATA = {
  ru: {
    // Popup
    statusOff: 'Выкл',
    statusOnAll: 'Вкл (Все сайты)',
    statusOnSelective: 'Вкл (Выборочно)',
    enableProxy: 'Включить прокси-сервер',
    enableProxyDesc: 'Основной выключатель прокси',
    globalMode: 'Глобальный режим',
    globalModeDesc: 'Проксировать все сайты (не только выбранные)',
    globalBannerText: 'Весь трафик направляется через прокси',
    searchPlaceholder: 'Поиск по доменам...',
    addCurrentTabDomain: 'Добавить домен текущей вкладки',
    chosenProxyDomains: 'Выбранные прокси-домены',
    allOpenDomains: 'Все открытые домены',
    noChosenDomains: 'Нет выбранных доменов',
    noChosenDomainsSearch: 'Нет выбранных доменов по вашему запросу',
    noOpenDomains: 'Нет открытых вкладок',
    noOpenDomainsSearch: 'Нет открытых вкладок по вашему запросу',
    loadingTabs: 'Загрузка вкладок...',
    openTabsCount: 'Открыто вкладок: {count}',
    proxySettings: 'Настройки прокси',

    // Options
    optionsPageTitle: 'Настройки ProxyControl',
    statusProxyOff: 'Прокси выключен',
    statusProxyOnAll: 'Прокси включен (Все сайты)',
    statusProxyOnSelective: 'Прокси включен (Выборочно)',
    currentProxy: 'Текущий прокси',
    tableHash: '#',
    tableType: 'Тип',
    tableIp: 'IP-адрес',
    tablePort: 'Порт',
    tableLogin: 'Логин',
    tablePassword: 'Пароль',
    tableActions: 'Действия',
    proxyNotConfigured: 'Прокси не настроен',
    deleteAction: 'Удалить',
    addNewProxy: 'Добавить новый прокси',
    proxyIpLabel: 'IP-адрес прокси',
    proxyIpPlaceholder: 'например, 192.168.1.1 или domain.com',
    proxyPortLabel: 'Порт прокси',
    proxyPortPlaceholder: 'например, 8080',
    proxyLoginLabel: 'Логин от прокси',
    proxyLoginPlaceholder: 'Логин (опционально)',
    proxyPassLabel: 'Пароль от прокси',
    proxyPassPlaceholder: 'Пароль (опционально)',
    saveProxyBtn: 'Добавить новый прокси',
    quickImport: 'Добавить новый прокси (быстро)',
    quickImportLabel: 'Вставьте строку в формате ip:port или ip:port@login:password',
    quickImportPlaceholder: 'ip:port\nили\nsocks5://username:password@ip:port\nили\nhttp://ip:port@username:password',
    quickImportHint: 'Поддерживается автоопределение формата',
    quickImportBtn: 'Добавить новый прокси',
    toastSaved: 'Прокси успешно сохранен и применен!',
    toastDeleted: 'Настройки прокси удалены',
    toastFillRequired: 'Заполните IP и Порт',
    toastEnterString: 'Введите строку настроек прокси',
    toastInvalidFormat: 'Неверный формат строки. Проверьте правильность ввода.'
  },
  en: {
    // Popup
    statusOff: 'OFF',
    statusOnAll: 'ON (All sites)',
    statusOnSelective: 'ON (Selective)',
    enableProxy: 'Enable Proxy Server',
    enableProxyDesc: 'Main proxy master switch',
    globalMode: 'Global Mode',
    globalModeDesc: 'Route all websites (not only selected)',
    globalBannerText: 'All network traffic is routed via proxy',
    searchPlaceholder: 'Search domains...',
    addCurrentTabDomain: 'Add current tab domain',
    chosenProxyDomains: 'Selected Proxy Domains',
    allOpenDomains: 'All Open Domains',
    noChosenDomains: 'No domains selected',
    noChosenDomainsSearch: 'No selected domains matching query',
    noOpenDomains: 'No open tabs',
    noOpenDomainsSearch: 'No open tabs matching query',
    loadingTabs: 'Loading tabs...',
    openTabsCount: 'Open tabs: {count}',
    proxySettings: 'Proxy Settings',

    // Options
    optionsPageTitle: 'ProxyControl Settings',
    statusProxyOff: 'Proxy Disabled',
    statusProxyOnAll: 'Proxy Enabled (All sites)',
    statusProxyOnSelective: 'Proxy Enabled (Selective)',
    currentProxy: 'Current Proxy',
    tableHash: '#',
    tableType: 'Type',
    tableIp: 'IP Address',
    tablePort: 'Port',
    tableLogin: 'Username',
    tablePassword: 'Password',
    tableActions: 'Actions',
    proxyNotConfigured: 'Proxy not configured',
    deleteAction: 'Delete',
    addNewProxy: 'Add New Proxy',
    proxyIpLabel: 'Proxy IP Address',
    proxyIpPlaceholder: 'e.g. 192.168.1.1 or domain.com',
    proxyPortLabel: 'Proxy Port',
    proxyPortPlaceholder: 'e.g. 8080',
    proxyLoginLabel: 'Proxy Username',
    proxyLoginPlaceholder: 'Username (optional)',
    proxyPassLabel: 'Proxy Password',
    proxyPassPlaceholder: 'Password (optional)',
    saveProxyBtn: 'Save Proxy',
    quickImport: 'Quick Proxy Import',
    quickImportLabel: 'Paste string formatted as ip:port or ip:port@login:password',
    quickImportPlaceholder: 'ip:port\nor\nsocks5://username:password@ip:port\nor\nhttp://ip:port@username:password',
    quickImportHint: 'Automatic format detection supported',
    quickImportBtn: 'Import Proxy',
    toastSaved: 'Proxy successfully saved and applied!',
    toastDeleted: 'Proxy settings removed',
    toastFillRequired: 'Please enter IP and Port',
    toastEnterString: 'Please enter a proxy configuration string',
    toastInvalidFormat: 'Invalid string format. Please verify your input.'
  }
};

let currentLang = 'ru';

function getTranslation(key, params = {}) {
  const dict = I18N_DATA[currentLang] || I18N_DATA.ru;
  let text = dict[key] || (I18N_DATA.ru[key] || key);
  for (const [pKey, pVal] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
  }
  return text;
}

function applyI18nToDOM() {
  document.documentElement.lang = currentLang;

  // Translate elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = getTranslation(key);
  });

  // Translate placeholders with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = getTranslation(key);
  });

  // Translate titles with data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = getTranslation(key);
  });

  // Update active state of language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setLanguage(lang, onLangChangeCallback) {
  if (lang !== 'ru' && lang !== 'en') lang = 'ru';
  currentLang = lang;
  chrome.storage.local.set({ language: lang }, () => {
    applyI18nToDOM();
    if (typeof onLangChangeCallback === 'function') {
      onLangChangeCallback(currentLang);
    }
  });
}

function initI18n(onLangChangeCallback) {
  chrome.storage.local.get(['language'], (res) => {
    if (res && (res.language === 'en' || res.language === 'ru')) {
      currentLang = res.language;
    } else {
      // Default to Russian if browser is Russian, else English
      const browserLang = (navigator.language || '').toLowerCase();
      currentLang = browserLang.startsWith('ru') ? 'ru' : 'en';
    }

    applyI18nToDOM();

    // Attach listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang !== currentLang) {
          setLanguage(selectedLang, onLangChangeCallback);
        }
      });
    });

    if (typeof onLangChangeCallback === 'function') {
      onLangChangeCallback(currentLang);
    }
  });

  // Listen for changes from other extension pages
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.language) {
      const newLang = changes.language.newValue;
      if (newLang && newLang !== currentLang) {
        currentLang = newLang;
        applyI18nToDOM();
        if (typeof onLangChangeCallback === 'function') {
          onLangChangeCallback(currentLang);
        }
      }
    }
  });
}
