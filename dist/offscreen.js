"use strict";
(() => {
  // src/offscreen/offscreen.ts
  var port = null;
  function connect() {
    try {
      port = chrome.runtime.connect({ name: "keepAlive" });
      port.onDisconnect.addListener(() => {
        port = null;
        setTimeout(connect, 1e3);
      });
    } catch (e) {
      setTimeout(connect, 1e3);
    }
  }
  connect();
  setInterval(() => {
    if (port) {
      try {
        port.postMessage({ type: "ping" });
      } catch (e) {
        connect();
      }
    } else {
      connect();
    }
  }, 2e4);
})();
//# sourceMappingURL=offscreen.js.map
