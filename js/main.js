// main.js - Handles loading templates and setting up the page

document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("header", "templates/header.html");
    loadTemplate("footer", "templates/footer.html");
    loadTemplate("meta", "templates/meta.html", true);

    // Load content dynamically if a page-specific dataset is present
    if (document.body.dataset.page) {
        loadContent(document.body.dataset.page);
    }

    // Initialize theme switcher
    if (typeof initializeThemeSwitcher === "function") {
        initializeThemeSwitcher();
    }
});

// Function to load an HTML template into a specified element
function loadTemplate(targetId, templatePath, insertBefore = false) {
    fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            const target = document.getElementById(targetId);
            if (target) {
                if (insertBefore) {
                    target.insertAdjacentHTML("beforebegin", data);
                } else {
                    target.innerHTML = data;
                }
            }
        })
        .catch(error => console.error(`Error loading template: ${templatePath}`, error));
}
