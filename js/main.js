document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadIndexArticles();
    attachFooterLinkListeners();
    attachHeaderLinkListeners(); // Attach header link listeners after templates load
});

function loadTemplates() {
    fetch('templates/meta.html')
        .then(response => response.text())
        .then(meta => {
            document.head.insertAdjacentHTML('beforeend', meta);
        }).catch((error) => console.error("meta error", error));

    fetch('templates/header.html')
        .then(response => response.text())
        .then(header => {
            document.getElementById('header').innerHTML = header;
            attachHeaderLinkListeners(); // Attach header link listeners after header loads
        }).catch((error) => console.error("header error", error));

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(footer => {
            document.getElementById('footer').innerHTML = footer;
            initThemeSwitch(); // Call initThemeSwitch here, after footer load
            attachFooterLinkListeners(); // Re-attach footer link listeners after footer load
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
    hideIndex(); // Hide index when an article is loaded
    scrollToElement('article-content'); // Scroll to the top of the article content when loaded
}

function hideIndex() {
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) indexArticleList.style.display = 'none';
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) articleContainer.style.display = 'flex';
}

function checkAndLoadToc() {
    const articleContent = document.getElementById("article-content");
    const tocContainer = document.getElementById("table-of-contents");
    const headers = articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (headers.length > 0) {
        loadToc(headers);
        tocContainer.style.display = "block"; // Show TOC if headers exist
    } else {
        tocContainer.innerHTML = "";
        tocContainer.style.display = "none"; // Hide TOC if no headers
    }
}

function loadToc(headers) {
    const tocList = document.getElementById("toc-list");
    if (tocList) {
        tocList.innerHTML = "";
        headers.forEach(header => {
            if (header.previousElementSibling && header.previousElementSibling.tagName === "COMMENT" && header.previousElementSibling.nodeValue.trim() === "toc-entry") {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                link.href = "#" + header.id;
                link.textContent = header.textContent;
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            }
        });
    } else {
        console.error("TOC list element not found!");
    }
}

function loadLegalContent() {
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) indexArticleList.style.display = 'none';
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) articleContainer.style.display = 'flex';
    loadContent("md", "legal-content");
    document.getElementById('table-of-contents').innerHTML = "";
    document.getElementById('table-of-contents').style.display = "none";
    scrollToElement('article-content'); // Scroll to the top of the content when loaded
}

function attachFooterLinkListeners() {
    const footerLegalLink = document.getElementById('footer-legal-link');
    if (footerLegalLink) {
        footerLegalLink.addEventListener('click', (event) => {
            event.preventDefault();
            loadLegalContent();
        });
    } else {
        console.error("Footer legal link not found!");
    }

    const footerTopLink = document.getElementById('footer-top-link');
    if (footerTopLink) {
        footerTopLink.addEventListener('click', (event) => {
            event.preventDefault();
            scrollToElement('article-content'); // Scroll to the top of the article content
        });
    } else {
        console.error("Footer top link not found!");
    }

    const footerIndexLink = document.getElementById('footer-index-link');
    if (footerIndexLink) {
        footerIndexLink.addEventListener('click', (event) => {
            event.preventDefault();
            showIndex(); // Show the index
            scrollToTop(); // Scroll to the top of the index
        });
    } else {
        console.error("Footer index link not found!");
    }
}

function attachHeaderLinkListeners() {
    const headerArticleListLink = document.getElementById('header-article-list-link');
    if (headerArticleListLink) {
        headerArticleListLink.addEventListener('click', (event) => {
            event.preventDefault();
            showIndex(); // Show index when the article list link is clicked
            scrollToElement('article-list-toc'); // Scroll to the top of the article list
        });
    } else {
        console.error("Header article list link not found!");
    }
}

function showIndex() {
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) indexArticleList.style.display = 'block';
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) articleContainer.style.display = 'none';
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<p>${message}</p>`;
    document.getElementById('article-content').innerHTML = '';
    document.getElementById('article-content').appendChild(errorDiv);
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with ID ${elementId} not found!`);
    }
}
