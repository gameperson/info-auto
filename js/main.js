document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("templates/header.html", "header-container");
    loadTemplate("templates/footer.html", "footer-container");
});

function loadTemplate(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}
