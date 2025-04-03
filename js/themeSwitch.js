function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            updateThemeIcon();
        });
        updateThemeIcon();
    }
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            themeToggle.innerHTML = '<img src="assets/images/bulb.0.svg" alt="Light Mode" style="width: 30px;">';
        } else {
            themeToggle.innerHTML = '<img src="assets/images/bulb.0.png" alt="Dark Mode" style="width: 30px;">';
        }
    }
}
