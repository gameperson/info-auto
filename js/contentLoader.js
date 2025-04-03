document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();
    loadArticles();
    loadPageList();
});

function loadTemplates() {
    fetch('templates/meta.html')
        .then(response => response.text())
        .then(meta => {
            document.getElementById('meta').innerHTML = meta;
        });

    fetch('templates/header.html')
        .then(response => response.text())
        .then(header => {
            document.getElementById('header').innerHTML = header;
            loadThemeSwitch('theme-switch-header');
        });

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(footer => {
            document.getElementById('footer').innerHTML = footer;
            loadThemeSwitch('theme-switch-footer');
        });
}

function loadThemeSwitch(elementId) {
    fetch('templates/theme_switch.html')
        .then(response => response.text())
        .then(themeSwitch => {
            document.getElementById(elementId).innerHTML = themeSwitch;
            initThemeSwitch();
        });
}

function loadArticles() {
    fetch('pages/articles.json')
        .then(response => response.json())
        .then(articles => {
            const tocList = document.getElementById('toc-list');
            articles.forEach(article => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = article.title;
                link.addEventListener('click', () => loadContent(article.fileType, article.fileName));
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });
        });
}

function loadPageList() {
    const pageListItems = document.getElementById('page-list-items');
    const pages = [
        { title: 'Disclaimer', fileName: 'disclaimer.html' }
    ];

    pages.forEach(page => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = page.title;
        link.addEventListener('click', () => loadPage(page.fileName));
        listItem.appendChild(link);
        pageListItems.appendChild(listItem);
    });
}

function loadPage(fileName) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = 'Loading...';
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            contentDiv.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            contentDiv.innerHTML = '<p>Failed to load page.</p>';
        });
}
