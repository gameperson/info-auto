document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadIndexArticles();
    loadIndexDisclaimerLink();
});

function loadTemplates() {
    // ... (same as before)
}

function loadThemeSwitch(elementId) {
    // ... (same as before)
}

function loadIndexArticles() {
    fetch('pages/articles.json')
        .then(response => response.json())
        .then(articles => {
            const articleListItems = document.getElementById('article-list-items');
            if (articleListItems) {
                articles.forEach(article => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = article.title;
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        loadArticleContent(article.fileType, article.fileName);
                    });
                    listItem.appendChild(link);
                    articleListItems.appendChild(listItem);
                });
            } else {
                console.error("article-list-items element not found!");
                showError("Error: Article list element not found.");
            }
        })
        .catch(error => {
            console.error('Error loading articles.json:', error);
            showError('Failed to load articles.');
        });
}

function loadArticleContent(fileType, fileName) {
    loadContent(fileType, fileName);
    loadToc();
}

function loadToc() {
    fetch('templates/toc.html')
        .then(response => response.text())
        .then(toc => {
            document.getElementById('table-of-contents').innerHTML = toc;
        })
        .catch(error => {
            console.error('Error loading toc template:', error);
            document.getElementById('table-of-contents').innerHTML = '<p>Failed to load table of contents.</p>';
        });
}

function loadIndexDisclaimerLink() {
    const disclaimerLinkDiv = document.getElementById('index-disclaimer-link');
    if (disclaimerLinkDiv) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = 'Disclaimer';
        link.addEventListener('click', (event) => {
            event.preventDefault();
            loadDisclaimer();
        });
        disclaimerLinkDiv.appendChild(link);
    } else {
        console.error("index-disclaimer-link element not found!");
    }
}

function loadDisclaimer() {
    fetch('disclaimer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('article-content').innerHTML = data;
            document.getElementById('table-of-contents').innerHTML = ""; //clear toc
        })
        .catch(error => {
            console.error('Error loading disclaimer:', error);
            document.getElementById('article-content').innerHTML = '<p>Failed to load disclaimer.</p>';
        });
}
