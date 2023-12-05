import { settings } from './settings.js';
import { debug } from './debug.js';

const settingsForm = document.getElementById("settings");
settingsForm.apiKey.value = settings.apiKey;
settingsForm.debug.checked = Boolean(settings.debug);

// Listen for new settings.
settingsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data));

    settings.apiKey = data.apiKey;
    settings.debug = Boolean(data.debug == "on");
    settings.update();

    debug("API key set to: " + settings.apiKey);
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = `Thanks!`;
});
