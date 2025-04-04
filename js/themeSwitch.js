function initThemeSwitch() {
    const themeToggle = document.querySelectorAll('#theme-toggle');
    themeToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    });
}

/*
function initThemeSwitch() {
    const themeToggle = document.querySelectorAll('#theme-toggle');
    themeToggle.forEach(toggle => {
        if (!toggle.dataset.listenerAdded) {
            toggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                updateThemeIcon(toggle);
            });
            updateThemeIcon(toggle);
            toggle.dataset.listenerAdded = true; // Mark that listener has been added
        }
    });
}

function updateThemeIcon(toggle) {
    if (toggle) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const img = toggle.querySelector('img');

        if (img) {
            if (isDarkMode) {
                img.src = 'assets/images/bulb.0.svg';
                img.alt = 'Light Mode';
            } else {
                img.src = 'assets/images/bulb.0.png';
                img.alt = 'Dark Mode';
            }
        }
    }
}
