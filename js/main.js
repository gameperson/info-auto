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
        }).catch((error) => console.error("header error", error));

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(footer => {
            document.getElementById('footer').innerHTML = footer;
            initThemeSwitch(); // Call initThemeSwitch here, after footer load
        }).catch((error) => console.error("footer error", error));
}

function loadIndexArticles() {
    fetch('pages/articles.json')
        .then(response => response.json())
        .then(articles => {
            const articleListToc = document.getElementById('article-list-toc');
            if (articleListToc) {
                articleListToc.innerHTML = '<ul></ul>';
                const articleListItems = articleListToc.querySelector('ul');
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
                console.error("article-list-toc element not found!");
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
    checkAndLoadToc();
}

function checkAndLoadToc() {
    const articleContent = document.getElementById("article-content");
    const tocContainer = document.getElementById("table-of-contents");
    if (articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6").length > 0) {
        loadToc();
        tocContainer.style.display = "block"; // Show TOC if headers exist
    } else {
        tocContainer.innerHTML = "";
        tocContainer.style.display = "none"; // Hide TOC if no headers
    }
}

function loadToc() {
    fetch('templates/toc.html')
        .then(response => response.text())
        .then(toc => {
            document.getElementById('table-of-contents').innerHTML = toc;
            createAnchorToc();
        }).catch((error) => console.error("toc error", error));
}

function createAnchorToc() {
    const headers = document.getElementById("article-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocList = document.getElementById("toc-list");
    if(tocList){
        tocList.innerHTML = "";
        headers.forEach(header => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#" + header.id;
            link.textContent = header.textContent;
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    }
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
            document.getElementById('table-of-contents').innerHTML = ""; // Clear TOC
            document.getElementById('table-of-contents').style.display = "none"; // Hide TOC
        })
        .catch(error => {
            console.error('Error loading disclaimer:', error);
            document.getElementById('article-content').innerHTML = '<p>Failed to load disclaimer.</p>';
        });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<p>${message}</p>`;
    document.getElementById('article-content').innerHTML = '';
    document.getElementById('article-content').appendChild(errorDiv);
}
