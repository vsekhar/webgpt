document.addEventListener("DOMContentLoaded", function () {
    const configForm = document.getElementById("settings");

    // TODO: get current API key and populate field

    configForm.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent default behavior
        const apiKey = document.getElementById("apikey").value;

        // TODO: update API key in storage

        const responseDiv = document.getElementById("response");
        responseDiv.innerHTML = `Thanks!`;
    });
});
