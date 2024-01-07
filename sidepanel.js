import { settings } from './settings.js';
import { debug } from './debug.js';

debug("WebGPT panel loaded");

document.getElementById("raw").style.visibility = settings.debug ? 'visible' : 'hidden';

// TODO: remove in favor of pull approach below
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "updateSidePanelRaw") {
            document.getElementById("rawData").innerHTML = request.innerText;
            sendResponse();
        }
    }
);

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        updateSidePanel();
    }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(function(activeInfo) {
    updateSidePanel();
});

function updateSidePanel() {
    // TODO: pull side panel content from service worker so side panel can update
    // itself when the active tab changes (currently the service worker pushes
    // updates to the side panel via updateSidePanelRaw message).
}