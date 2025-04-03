function loadContentFromFile(filePath, contentDiv) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            if (filePath.endsWith('.md')) {
                contentDiv.innerHTML = marked.parse(data); // Requires marked.js library
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
