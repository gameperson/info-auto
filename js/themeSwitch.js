function initThemeSwitch() {
    const themeToggle = document.querySelectorAll('#theme-toggle');
    themeToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            updateThemeIcon(toggle);
        });
        updateThemeIcon(toggle);
    });
}

function updateThemeIcon(toggle) {
    if (toggle) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            toggle.innerHTML = '<img src="assets/images/bulb.0.svg" alt="Light Mode" style="width: 30px;">';
        } else {
            toggle.innerHTML = '<img src="assets/images/bulb.0.png" alt="Dark Mode" style="width: 30px;">';
        }
    }
}
