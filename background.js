chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "callOpenAPI") {
            // TODO fetch api key from storage or suspend until one is entered
            const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
        
            const apiUrl = "https://api.openai.com/v1/chat/completions"; // Adjust the API endpoint

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
        }

        return true; // Indicates that the response will be sent asynchronously
    }
);
