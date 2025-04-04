document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadIndexArticles();
    loadIndexDisclaimerLink();
});

function loadTemplates() {
    fetch('templates/meta.html')
        .then(response => response.text())
        .then(meta => {
            document.getElementById('meta').innerHTML = meta;
        }).catch((error) => console.error("meta error", error));

    fetch('templates/header.html')
        .then(response => response.text())
        .then(header => {
            document.getElementById('header').innerHTML = header;
            // initThemeSwitch(); // move the init function call to after the header and footer are loaded.
        }).catch((error) => console.error("header error", error));

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(footer => {
            document.getElementById('footer').innerHTML = footer;
            initThemeSwitch(); // Call initThemeSwitch here
        }).catch((error) => console.error("footer error", error));
}

// ... rest of the main.js file
