document.addEventListener('DOMContentLoaded', () => {
    checkAndLoadToc();
});

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
    const tocTriggerTags = ["Introduction", "Uses and Powers of AI Agents", "Misuse and Pitfalls of AI", "Reading List"];
    if (tocList) {
        tocList.innerHTML = "";
        headers.forEach(header => {
            const headerText = header.textContent.trim();
            if (tocTriggerTags.includes(headerText) || (header.previousSibling && header.previousSibling.nodeType === Node.COMMENT_NODE && header.previousSibling.nodeValue.trim() === "toc-entry")) {
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
