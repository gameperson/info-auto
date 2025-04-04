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
        const img = toggle.querySelector('img'); // Get the image element

        if (img) { // Check if an image exists
            if (isDarkMode) {
                img.src = 'assets/images/bulb.0.svg';
                img.alt = 'Light Mode';
            } else {
                img.src = 'assets/images/bulb.0.png';
                img.alt = 'Dark Mode';
            }
        } else {
            // Handle the case where there's no image (e.g., text button)
            if (isDarkMode) {
                toggle.textContent = 'Light Mode';
            } else {
                toggle.textContent = 'Dark Mode';
            }
        }
    }
}
