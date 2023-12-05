chrome.runtime.sendMessage({
    action: "pageContent",
    url: document.URL,
    innerText: document.body.innerText
});
