'use strict'


console.log("background-script: LOAD");

var connections = {};

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onConnect
// Supported by Chrome, Edge, Firefox and Opera
browser.runtime.onConnect.addListener(function (port) {
  console.log("background-script onConnect", port);

  // Only accept connections from panel or content scripts
  if (port.name != "panel" && port.name != "content") {
    return;
  }

  var extensionListener = function (message) {
    console.log("background-script port.onMessage", message, port);

    var tabId = port.sender.tab ? port.sender.tab.id : message.tabId;

    if (message.action == "init") {
      if (!connections[tabId]) {
        connections[tabId] = {};
      }
      connections[tabId][port.name] = port;
      return;
    }

    if (message.target) {
      var conn = connections[tabId][message.target];
      if (conn) {
        conn.postMessage(message);
      }
    }
  };
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function(port) {
    console.log("background-script onDisconnect", port);

    port.onMessage.removeListener(extensionListener);

    var tabs = Object.keys(connections);
    for (var i=0, len=tabs.length; i < len; i++) {
      if (connections[tabs[i]][port.name] === port) {
        console.log("background-script onDisconnect connections cleanup",
                    {tabId: tabs[i], portName: port.name});
        delete connections[tabs[i]][port.name];

        if (Object.keys(connections[tabs[i]]).length === 0) {
          console.log("background-script onDisconnect remove connection object",
                      {tabId: tabs[i]});
          delete connections[tabs[i]];
        }
        break;
      }
    }
  });
});

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
// Supported by Chrome, Edge, Firefox and Opera
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("background-script runtime.onMessage", request, sender);

  if (request.target == "content" && request.tabId) {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage
    // Supported by Chrome, Edge, Firefox and Opera
    browser.tabs.sendMessage(request.tabId, request);
  }

  return true;
});
