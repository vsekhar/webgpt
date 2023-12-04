// In-page cache of settings
const settingsForm = document.getElementById("settings");
const settings = {};

settingsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data));

    settings.apiKey = data.apiKey;
    settings.debug = Boolean(data.debug == "on");

    console.log("API key set to: " + settings.apiKey);
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = `Thanks!`;
    chrome.storage.sync.set({ settings });
});

// Initialize form with stored settings
const data = await chrome.storage.sync.get("settings");
if (data === undefined) {
    console.log("No settings in storage");
}
Object.assign(settings, data.settings);
console.log("Settings from storage:" + JSON.stringify(settings));

if (settings.apiKey) {
    settingsForm.apiKey.value = settings.apiKey;
}
if (settings.debug === undefined) {
    settings.debug = false;
}
settingsForm.debug.checked = Boolean(settings.debug);
