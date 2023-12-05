export const settings = {
    apiKey: "",
    debug: false,
    update: function() {
        chrome.storage.sync.set({settings: this});
    }
};

// Initialize with stored settings
const data = await chrome.storage.sync.get("settings");
if (data === undefined || data.settings === undefined) {
    console.log("No settings in storage, using defaults");
    settings.update();
}
else {
    console.log("Settings from storage:" + JSON.stringify(data.settings));
    Object.assign(settings, data.settings);
}
