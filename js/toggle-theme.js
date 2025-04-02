// toggle-theme.js - Handles dark/light mode switching

document.addEventListener("DOMContentLoaded", function () {
    initializeThemeSwitcher();
});

function initializeThemeSwitcher() {
    const themeToggle = document.getElementById("theme-toggle");
    const storedTheme = localStorage.getItem("theme") || "light";

    // Apply stored theme
    document.documentElement.setAttribute("data-theme", storedTheme);

    // Update toggle button text/icon
    updateToggleButton(themeToggle, storedTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateToggleButton(themeToggle, newTheme);
        });
    }
}

// Updates the toggle button appearance
function updateToggleButton(button, theme) {
    if (!button) return;
    button.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
}
