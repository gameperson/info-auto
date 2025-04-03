function loadContent(fileType, fileName) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = 'Loading...';
    const filePath = `pages/${fileName}.${fileType}`;

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            if (filePath.endsWith('.md')) {
                contentDiv.innerHTML = marked.parse(data); // Requires marked.js
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
