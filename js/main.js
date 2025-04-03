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
        })
        .catch(error => {
            console.error('Error loading meta template:', error);
            showError('Failed to load meta template.');
        });

    fetch('templates/header.html')
        .then(response => response.text())
        .then(header => {
            document.getElementById('header').innerHTML = header;
            loadThemeSwitch('theme-switch-header');
        })
        .catch(error => {
            console.error('Error loading header template:', error);
            showError('Failed to load header template.');
        });

    fetch('templates/footer.html')
        .then(response => response.text())
        .then(footer => {
            document.getElementById('footer').innerHTML = footer;
            loadThemeSwitch('theme-switch-footer');
        })
        .catch(error => {
            console.error('Error loading footer template:', error);
            showError('Failed to load footer template.');
        });
}

function loadThemeSwitch(elementId) {
    fetch('templates/theme_switch.html')
        .then(response => response.text())
        .then(themeSwitch => {
            document.getElementById(elementId).innerHTML = themeSwitch;
            initThemeSwitch();
        })
        .catch(error => {
            console.error('Error loading theme switch template:', error);
            showError('Failed to load theme switch template.');
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
        })
        .catch(error => {
            console.error('Error loading articles.json:', error);
            showError('Failed to load articles.');
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

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `<p>${message}</p>`;
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').appendChild(errorDiv);
}
