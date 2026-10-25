export type ProxyType = 'http' | 'https' | 'socks4' | 'socks5';

export interface ProxyConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  type?: ProxyType;
}

export type Language = 'ru' | 'en';

export interface StorageData {
  proxyConfig?: ProxyConfig;
  enabled?: boolean;
  globalMode?: boolean;
  includedDomains?: string[];
  discoveredDomains?: string[];
  language?: Language;
}

export interface UpdateProxySettingsMessage {
  action: 'updateProxySettings';
}

export interface PingMessage {
  type: 'ping';
}

export type ExtensionMessage = UpdateProxySettingsMessage | PingMessage;
