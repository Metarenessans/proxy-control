let port: chrome.runtime.Port | null = null;

function connect(): void {
  try {
    port = chrome.runtime.connect({ name: 'keepAlive' });
    port.onDisconnect.addListener(() => {
      port = null;
      setTimeout(connect, 1000);
    });
  } catch (e) {
    setTimeout(connect, 1000);
  }
}

connect();

// Send heartbeat every 20 seconds to prevent Chrome from terminating the service worker
setInterval(() => {
  if (port) {
    try {
      port.postMessage({ type: 'ping' });
    } catch (e) {
      connect();
    }
  } else {
    connect();
  }
}, 20000);
