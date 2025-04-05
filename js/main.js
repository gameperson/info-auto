/*
document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadIndexArticles();
    attachFooterLinkListeners();
    attachHeaderLinkListeners(); // New function call
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
            initThemeSwitch();
        }).catch((error) => console.error("footer error", error));
}

function loadIndexArticles() {
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) {
        articleContainer.style.display = 'none'; // Hide article container on index
    }
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) {
        indexArticleList.style.display = 'block'; // Show article list on index
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
                            // Hide index elements when an article is loaded
                            if (indexArticleList) indexArticleList.style.display = 'none';
                            if (articleContainer) articleContainer.style.display = 'flex'; // Show article container
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
}

function loadArticleContent(fileType, fileName) {
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) indexArticleList.style.display = 'none'; // Hide index elements
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) articleContainer.style.display = 'flex'; // Show article container
    loadContent(fileType, fileName);
    checkAndLoadToc();
}

function checkAndLoadToc() {
    const articleContent = document.getElementById("article-content");
    const tocContainer = document.getElementById("table-of-contents");
    if (articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6").length > 0) {
        loadToc();
        tocContainer.style.display = "block";
    } else {
        tocContainer.innerHTML = "";
        tocContainer.style.display = "none";
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

function attachFooterLinkListeners() {
    const footerDisclaimerLink = document.getElementById('footer-disclaimer-link');
    if (footerDisclaimerLink) {
        footerDisclaimerLink.addEventListener('click', (event) => {
            event.preventDefault();
            loadDisclaimer();
        });
    } else {
        console.error("Footer disclaimer link not found!");
    }

    const footerContactLink = document.querySelector('.footer-section h3:contains("About") + ul li a[href="#contact"]');
    if (footerContactLink) {
        footerContactLink.href = 'mailto:your-email@example.com'; // Replace with your actual email
    }
}

function attachHeaderLinkListeners() {
    const headerDisclaimerLink = document.getElementById('header-disclaimer-link');
    if (headerDisclaimerLink) {
        headerDisclaimerLink.addEventListener('click', (event) => {
            event.preventDefault();
            loadDisclaimer();
        });
    } else {
        console.error("Header disclaimer link not found!");
    }
}

function loadDisclaimer() {
    const indexArticleList = document.getElementById('index-article-list');
    if (indexArticleList) indexArticleList.style.display = 'none'; // Hide index elements
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) articleContainer.style.display = 'flex'; // Show article container
    loadContent("md", "disclaimer");
    document.getElementById('table-of-contents').innerHTML = "";
    document.getElementById('table-of-contents').style.display = "none";
}

function loadContent(fileType, fileName) {
    const contentDiv = document.getElementById('article-content');
    contentDiv.innerHTML = 'Loading...';
    const filePath = `pages/${fileName}.${fileType}`;

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            if (filePath.endsWith('.md')) {
                try {
                    contentDiv.innerHTML = marked.parse(data);
                } catch (error) {
                    console.error('Error parsing markdown:', error);
                    contentDiv.innerHTML = '<p>Error parsing markdown.</p>';
                }
            } else if (filePath.endsWith('.txt')) {
                contentDiv.innerHTML = `<pre>${data}</pre>`;
            } else {
                contentDiv.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<p>${message}</p>`;
    document.getElementById('article-content').innerHTML = '';
    document.getElementById('article-content').appendChild(errorDiv);
}
end new code */


document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadIndexArticles();
    attachFooterLinkListeners();
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

function loadDisclaimer() {
    loadArticleContent("md", "disclaimer");
}

/* **
function loadDisclaimer() {
    fetch('pages/disclaimer.md')
        .then(response => response.text())
        .then(data => {
            document.getElementById('article-content').innerHTML = marked.parse(data);
            document.getElementById('table-of-contents').innerHTML = "";
            document.getElementById('table-of-contents').style.display = "none";
            // Update footer disclaimer link (optional, if you want it to be a direct link to the loaded content)
            const footerDisclaimerLink = document.getElementById('footer-disclaimer-link');
            if (footerDisclaimerLink) {
                footerDisclaimerLink.href = '#article-content'; // Example: link to the content area
            }
        })
        .catch(error => {
            console.error('Error loading disclaimer:', error);
            document.getElementById('article-content').innerHTML = '<p>Failed to load disclaimer.</p>';
        });
}
** */

function attachFooterLinkListeners() {
    const footerDisclaimerLink = document.getElementById('footer-disclaimer-link');
    if (footerDisclaimerLink) {
        footerDisclaimerLink.addEventListener('click', (event) => {
            event.preventDefault();
            loadDisclaimer();
        });
    } else {
        console.error("Footer disclaimer link not found!");
    }

    const footerContactLink = document.querySelector('.footer-section h3:contains("About") + ul li a[href="#contact"]');
    if (footerContactLink) {
        footerContactLink.href = 'mailto:your-email@example.com'; // Replace with your actual email
    }

    // About Us link can remain as '#' for now if it's a placeholder
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<p>${message}</p>`;
    document.getElementById('article-content').innerHTML = '';
    document.getElementById('article-content').appendChild(errorDiv);
}
