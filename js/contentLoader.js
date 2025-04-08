// contentLoader.js

function loadContent(fileName, fileType) {
    fetch(`/pages/${fileName}.${fileType}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = fileType === 'md' ? marked(data) : data;
            if (fileType === 'md') {
                generateTOC();
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

function loadArticles() {
    fetch('/pages/articles.json')
        .then(response => response.json())
        .then(articles => {
            const articleList = document.getElementById('article-list');
            articleList.innerHTML = '';
            articles.forEach(article => {
                const listItem = document.createElement('li');
                listItem.textContent = article.title;
                listItem.onclick = () => loadContent(article.fileName, article.fileType);
                articleList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading articles:', error));
}

document.addEventListener('DOMContentLoaded', loadArticles);
