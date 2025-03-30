document.addEventListener("DOMContentLoaded", function () {
    loadArticles("pages/articles.json", "article-container");
});

function loadArticles(jsonFile, containerId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById(containerId);
            container.innerHTML = "";  // Clear previous content

            data.forEach(article => {
                let articleElement = document.createElement("article");
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p><em>By ${article.author}, ${article.date}</em></p>
                    <p>${article.content}</p>
                `;
                container.appendChild(articleElement);
            });
        })
        .catch(error => console.error(`Error loading ${jsonFile}:`, error));
}
