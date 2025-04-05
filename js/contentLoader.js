function loadContent(fileType, fileName) {
    const contentDiv = document.getElementById('article-content');
    contentDiv.innerHTML = 'Loading...';
    // const filePath = `pages/<span class="math-inline">\{fileName\}\.</span>{fileType}`;
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
