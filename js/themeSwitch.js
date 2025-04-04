function initThemeSwitch() {
    const headerThemeToggle = document.getElementById('header-switch-theme');
    const footerThemeToggle = document.getElementById('footer-switch-theme');

    if (headerThemeToggle) {
        headerThemeToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('dark-mode');
        });
    }

    if (footerThemeToggle) {
        footerThemeToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('dark-mode');
        });
    }
}
