// main.js - Handles loading templates and basic page setup

document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("header", "templates/header.html");
    loadTemplate("footer", "templates/footer.html");
    loadTemplate("meta", "templates/meta.html", true);

    // Load dynamic content if applicable
    if (document.body.dataset.page) {
        loadContent(document.body.dataset.page);
    }
});

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
