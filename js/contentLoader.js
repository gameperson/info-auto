// contentLoader.js - Handles Markdown and JSON content loading

async function loadContent(page) {
    let contentPath = `pages/${page}.md`;
    let response = await fetch(contentPath);
    let content = await response.text();
    
    document.getElementById("content").innerHTML = markdownToHtml(content);
}

// Basic Markdown conversion (Placeholder - replace with a library like marked.js)
function markdownToHtml(markdown) {
    return markdown.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}
