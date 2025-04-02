// contentLoader.js - Handles loading and rendering content dynamically

async function loadContent(page) {
    const markdownPath = `pages/${page}.md`;
    const jsonPath = `pages/${page}.json`;

    try {
        // Try to fetch JSON content first
        let response = await fetch(jsonPath);
        if (response.ok) {
            let jsonData = await response.json();
            document.getElementById("content").innerHTML = renderJSONContent(jsonData);
            return;
        }

        // If JSON is not found, try Markdown
        response = await fetch(markdownPath);
        if (response.ok) {
            let markdown = await response.text();
            document.getElementById("content").innerHTML = markdownToHtml(markdown);
            return;
        }

        throw new Error("Content not found.");
    } catch (error) {
        console.error(`Error loading content for ${page}:`, error);
        document.getElementById("content").innerHTML = "<p>Content could not be loaded.</p>";
    }
}

// Convert Markdown to basic HTML
function markdownToHtml(markdown) {
    return markdown
        .replace(/^### (.*$)/gm, "<h3>$1</h3>") // Convert ### headers
        .replace(/^## (.*$)/gm, "<h2>$1</h2>") // Convert ## headers
        .replace(/^# (.*$)/gm, "<h1>$1</h1>") // Convert # headers
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert bold text
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert italic text
        .replace(/\n/g, "<br>"); // Convert line breaks
}

// Render JSON content dynamically
function renderJSONContent(jsonData) {
    let html = "<ul>";
    jsonData.forEach(item => {
        html += `<li><a href="${item.link}">${item.title}</a></li>`;
    });
    html += "</ul>";
    return html;
}
