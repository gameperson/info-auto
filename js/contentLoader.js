// Function to load content based on file type and name
function loadContent(fileType, fileName) {
    const contentDiv = document.getElementById('article-content');
    const tocDiv = document.getElementById('table-of-contents');
    contentDiv.innerHTML = 'Loading...';
    tocDiv.innerHTML = '';

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

            // Populate TOC if anchors exist
            const anchors = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (anchors.length > 0) {
                tocDiv.innerHTML = '<ul id="toc-list"></ul>';
                const tocList = document.getElementById('toc-list');
                anchors.forEach(anchor => {
                    const tocItem = document.createElement('li');
                    tocItem.innerHTML = `<a href="#${anchor.id}">${anchor.innerText}</a>`;
                    tocList.appendChild(tocItem);
                });
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Failed to load content.</p>';
        });
}
