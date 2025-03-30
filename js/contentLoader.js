document.addEventListener("DOMContentLoaded", function () {
    loadArticles("pages/articles.json", "article-container");
});

function loadArticles(jsonFile, containerId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById(containerId);
            container.innerHTML = "";  // Clear previous content

            fetch("templates/article_template.html")
                .then(response => response.text())
                .then(template => {
                    data.forEach(article => {
                        let articleElement = document.createElement("div");
                        articleElement.innerHTML = template;
                        articleElement.querySelector("#article-title").textContent = article.title;
                        articleElement.querySelector("#article-author").textContent = article.author;
                        articleElement.querySelector("#article-date").textContent = article.date;
                        articleElement.querySelector("#article-content").innerHTML = article.content;

                        container.appendChild(articleElement);
                    });
                })
                .catch(error => console.error(`Error loading template:`, error));
        })
        .catch(error => console.error(`Error loading ${jsonFile}:`, error));
}
