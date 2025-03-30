document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("templates/header.html", "header-container");
    loadTemplate("templates/footer.html", "footer-container");
});

function loadTemplate(templatePath, containerId) {
    fetch(templatePath)
        .then(response => response.text())
        .then(html => document.getElementById(containerId).innerHTML = html)
        .catch(error => console.error(`Error loading ${templatePath}:`, error));
}
