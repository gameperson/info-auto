// toggle-theme.js

function toggleTheme() {
    // Toggle the light theme class
    document.body.classList.toggle('light-theme');

    // Check the current theme
    const isLight = document.body.classList.contains('light-theme');

    // Get all theme icons
    const icons = document.querySelectorAll('.theme-icon');

    // Update icons based on theme
    icons.forEach(icon => {
        icon.src = isLight ? '/assets/images/bulb_black.png' : '/assets/images/bulb_white.png';
        icon.alt = isLight ? 'Light Mode Icon' : 'Dark Mode Icon';
    });

    // Store the user's preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Sync theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Update icons after applying theme
    toggleTheme(); 
});
