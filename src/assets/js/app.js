import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';

import Glide from '@glidejs/glide';

// If JavaScript is enabled, add a class to the <html> element.
document.documentElement.classList.add('js');

// DOM elements.
const code = document.querySelectorAll(
    'code[class*="language-"], [class*="language-"] code'
);
const navMenu = document.getElementById('site-navigation');
const slider = document.querySelectorAll('.glide');

// Syntax highlighting via Prism.
if (code.length) {
    Prism.highlightAll();
}

// Responsive navigation menu.
if (navMenu) {
    const navToggle = document.getElementById('site-navigation-toggle');
    const navList = document.getElementById('site-navigation-list');

    navToggle?.addEventListener('click', (event) => {
        event.preventDefault();

        navToggle.classList.toggle('site-navigation-toggle-active');
        navMenu.classList.toggle('site-navigation-open');
    });

    navList?.addEventListener('focusin', () => {
        navToggle?.classList.add('site-navigation-toggle-active');
        navMenu.classList.add('site-navigation-open');
    });

    navList?.addEventListener('focusout', (event) => {
        if (!navList.contains(event.relatedTarget)) {
            navToggle?.classList.remove('site-navigation-toggle-active');
            navMenu.classList.remove('site-navigation-open');
        }
    });
}

// Slider via Glide.
if (slider.length) {
    new Glide('.glide', {
        type: 'carousel',
    }).mount();
}

// Dark mode.
const bodyClass = document.body.classList;
const preferredImages = document.querySelectorAll(
    'img.prefers-color-scheme'
);
const darkModePreference = window.matchMedia(
    'screen and (prefers-color-scheme: dark)'
);
const lightSwitch = document.getElementById('lightswitch');

// Change images to their dark-mode versions.
const makeImagesDark = () => {
    bodyClass.add('darkmode');

    for (const image of preferredImages) {
        if (image.dataset.srcDark) {
            image.src = image.dataset.srcDark;
        }

        if (image.dataset.srcsetDark) {
            image.srcset = image.dataset.srcsetDark;
        }
    }
};

// Change images to their light-mode versions.
const makeImagesLight = () => {
    bodyClass.remove('darkmode');

    for (const image of preferredImages) {
        if (image.dataset.srcLight) {
            image.src = image.dataset.srcLight;
        }

        if (image.dataset.srcsetLight) {
            image.srcset = image.dataset.srcsetLight;
        }
    }
};

// Detect and change dark/light mode,
// but only when there is no localStorage preference.
const toggleDarkMode = (mediaQuery) => {
    if (localStorage.getItem('prefers-color-scheme') !== null) {
        return;
    }

    if (mediaQuery.matches) {
        makeImagesDark();
    } else if (bodyClass.contains('darkmode')) {
        makeImagesLight();
    }
};

toggleDarkMode(darkModePreference);
darkModePreference.addEventListener('change', toggleDarkMode);

// Check localStorage for a manually selected preference.
if (localStorage.getItem('prefers-color-scheme') === 'dark') {
    makeImagesDark();
}

// Switch between dark and light mode manually.
lightSwitch?.addEventListener('click', (event) => {
    event.preventDefault();

    if (bodyClass.contains('darkmode')) {
        makeImagesLight();
        localStorage.setItem('prefers-color-scheme', 'light');
    } else {
        makeImagesDark();
        localStorage.setItem('prefers-color-scheme', 'dark');
    }
});
