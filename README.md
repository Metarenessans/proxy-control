# ProxyControl — Smart Chromium Proxy Controller (TypeScript)

![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)
![Manifest Version](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)
![Platform](https://img.shields.io/badge/Platform-Chromium%20%7C%20Chrome%20%7C%20Edge%20%7C%20Brave-blue.svg)
![Bilingual](https://img.shields.io/badge/Language-Russian%20%7C%20English-orange.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

**ProxyControl** is a high-performance, dark-mode Chromium browser extension (Manifest V3) completely written in **TypeScript** for granular proxy management. It supports dynamic PAC (Proxy Auto-Configuration) script generation, selective per-domain proxy routing, global traffic redirection, automatic CDN/sub-resource domain discovery, and background Keep-Alive persistence.

Developed by **Oleg G.** ([@Metarenessans](https://github.com/Metarenessans)).

---

## Key Features

- **Built with TypeScript & esbuild:** Clean, strictly typed architecture with sub-millisecond bundling and zero runtime overhead.
- **Selective Domain Routing (Smart Proxying):** Route only specific domains through the proxy, while keeping all other traffic direct.
- **Global Proxy Switch:** Single-click toggle to route 100% of network requests through the configured proxy server.
- **Bilingual Interface (RU / EN):** One-click toggle between Russian and English in both the popup and settings panel, with instant synchronization.
- **Reordered Ergonomic Layout:** «Add current tab domain» action is placed directly beneath master switches, immediately followed by domain search filtering.
- **Auto-Discovery of Sub-Resources:** Analyzes incoming `webRequest` events to automatically discover external CDNs, authentication endpoints, and sub-resources spawned by proxied domains (e.g. YouTube CDN, OpenAI/ChatGPT assets).
- **Active Tab One-Click Add:** Instantly add the current active tab's domain to your proxy inclusion list with a single click.
- **Support for All Modern Protocols:**
  - HTTP
  - HTTPS
  - SOCKS4
  - SOCKS5
  - Proxy authentication with Username & Password (`webRequestAuthProvider`)
- **Fast Import Parser:** Automatically parses common proxy formats:
  - `ip:port`
  - `ip:port:user:password`
  - `login:password@ip:port`
  - `socks5://user:pass@ip:port`
  - `http://ip:port@user:pass`
- **Service Worker Keep-Alive:** Uses a dedicated Chromium `offscreen` document to maintain persistent heartbeat connections, ensuring Manifest V3 service workers stay awake to handle proxy authentication seamlessly.
- **Modern Glassmorphism UI:** Clean dark aesthetic designed with custom CSS tokens, status pills, responsive controls, and zero disruptive hover displacements.

---

## Project Structure

```text
proxy-control/
├── src/
│   ├── background/
│   │   └── background.ts       # Manifest V3 service worker & PAC generator
│   ├── popup/
│   │   ├── popup.html          # Main popup markup (ergonomic layout)
│   │   └── popup.ts            # Tab grouping, search, domain filtering, i18n
│   ├── options/
│   │   ├── options.html        # Settings & fast import interface
│   │   └── options.ts          # Storage manager, parser, and toast notifications
│   ├── offscreen/
│   │   ├── offscreen.html      # Offscreen worker container
│   │   └── offscreen.ts        # Keep-Alive heartbeat worker
│   ├── i18n/
│   │   └── index.ts            # Strongly-typed internationalization engine (RU/EN)
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces & types
│   ├── styles/
│   │   └── style.css           # Dark glassmorphic stylesheet
│   ├── icons/                  # Extension icons (16px, 32px, 48px, 128px)
│   └── manifest.json           # Chromium Extension Manifest V3 configuration
├── dist/                       # Compiled production bundle ready for browser loading
├── build.mjs                   # Fast esbuild compilation & asset bundler
├── tsconfig.json               # Strict TypeScript configuration
└── package.json
```

---

## Development & Build Commands

```bash
# Install dependencies
npm install

# Type-check with TypeScript compiler
npm run type-check

# Build and bundle into dist/
npm run build

# Fast bundle without type-check
npm run bundle
```

---

## Installation & Setup

### 1. Load in Chrome / Brave / Edge / Chromium

1. Clone this repository:
   ```bash
   git clone https://github.com/Metarenessans/proxy-control.git
   ```
2. Build the project (if downloading source):
   ```bash
   npm install && npm run build
   ```
3. Open your browser and navigate to the Extensions management page:
   - Chrome / Brave: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Enable **Developer mode** (toggle in the top-right corner).
5. Click **Load unpacked** (Загрузить распакованное расширение).
6. Select the `dist` folder (or your unpacked extension directory).
7. The **ProxyControl** shield icon will appear on your browser toolbar!

---

## How to Use

1. Click the **ProxyControl** icon on the toolbar to open the popup.
2. Click **Proxy Settings** (or right-click the icon and choose *Options*).
3. Enter your proxy server details manually or paste into the **Quick Proxy Import** box:
   ```text
   socks5://myuser:mypassword@192.168.1.100:1080
   ```
4. Click **Add New Proxy** / **Save Proxy**.
5. Switch on the **Enable Proxy Server** toggle:
   - Use **Selective Mode** to route only toggled domains.
   - Use **Global Mode** to route all traffic through the proxy.
6. Toggle between **RU** and **EN** at any time using the header language switcher.

---

## Tech Stack

- **Languages:** TypeScript 5.8+, ES2022, HTML5, CSS3 Glassmorphism
- **Build System:** esbuild, TypeScript Compiler (`tsc`)
- **APIs Used:**
  - `chrome.proxy` (PAC scripts)
  - `chrome.webRequest` & `chrome.webRequestAuthProvider`
  - `chrome.offscreen` (Heartbeat connection)
  - `chrome.storage.local`
  - `chrome.tabs`
  - `chrome.alarms`

---

## Author & Maintainer

**Oleg G.**
- GitHub: [@Metarenessans](https://github.com/Metarenessans)
- Role: Full-Stack Engineer & System Architect
