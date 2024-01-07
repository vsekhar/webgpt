// "use strict";

chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['WORKERS'],
    justification: 'worker',  
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "pageContent") {
            console.log("content: URL=" + String(request.url));
            console.log("innerText: " + String(request.innerText));
            
            // TODO: save into IndexedDB
            // TODO: submit for summarization

            // Forward to side panel for display
            request.action = "updateSidePanelRaw";
            return chrome.runtime.sendMessage(request);
        }
    }
);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "callOpenAPI") {
            // TODO fetch api key from storage or suspend until one is entered
            var apiKey = "";
            chrome.storage.sync.get("apikey", function (result) {
                if (result === undefined) {
                    console.log("callOpenAPI: no API key specified");
                }
                else if (result.apikey) {
                    apiKey = result.apikey;
                }
            })

            if (!apiKey) {
                return;
            }

            // source: https://platform.openai.com/docs/guides/text-generation
            const apiUrl = "https://api.openai.com/v1/chat/completions";

            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(request.data)
            })
                .then(response => response.json())
                .then(data => sendResponse({ success: true, data }))
                .catch(error => sendResponse({ success: false, error }));
            return true; // Indicates that the response will be sent asynchronously
        }
    }
);
