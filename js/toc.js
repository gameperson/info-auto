// toc.js

function generateTOC() {
    const toc = document.getElementById('toc');
    const headers = document.querySelectorAll('#content h2');
    toc.innerHTML = '<ul>';
    headers.forEach(header => {
        const tocItem = document.createElement('li');
        tocItem.innerHTML = `<a href="#${header.id}">${header.textContent}</a>`;
        toc.appendChild(tocItem);
    });
    toc.innerHTML += '</ul>';
}

/*
document.addEventListener('DOMContentLoaded', () => {
    generateToc();
});

function generateToc() {
    const articleContent = document.getElementById("article-content");
    const tocContainer = document.getElementById("table-of-contents");
    const tocList = document.getElementById("toc-list");

    if (!articleContent || !tocContainer || !tocList) return;

    const headers = articleContent.querySelectorAll("h2");
    if (headers.length > 0) {
        tocList.innerHTML = "";
        headers.forEach(header => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const headerId = header.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            header.id = headerId;
            link.href = "#" + headerId;
            link.textContent = header.textContent;
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        tocContainer.style.display = "block"; // Show TOC if headers exist
    } else {
        tocContainer.style.display = "none"; // Hide TOC if no headers
    }
}
