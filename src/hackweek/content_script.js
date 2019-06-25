// Content scripts have access to the DOM
// The content scripts are available in every tab
// The content script needs to send the DOM to the background script.
//

'use strict'


console.log("content-script: LOAD");

var port;

function setupPort() {
  console.log("content-script: Setting up port")
  if (!port) {
    console.log("content-script: New port")
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connect
    port = browser.runtime.connect("web_extension@loehel.de", { name: "content" });
    // returns a runtime.Port
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
    console.log("content-script: Sending init message to the background")
    port.postMessage({ action: "init" });
    port.onDisconnect.addListener(function () {
      port = null;
    });
  }
}

function getDOM() {
  console.log("content-script: Getting DOM")
  setupPort();
  console.log("content-script: Sending DOM message to the background")
  port.postMessage({
    action: "extractDOM",
    dom: document.documentElement.innerHTML,
  });
};

getDOM();
