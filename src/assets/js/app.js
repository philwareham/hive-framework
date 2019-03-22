//import {$,jQuery} from 'jquery';
// export for others scripts to use
//window.$ = $;
//window.jQuery = jQuery;

import Prism from 'prismjs';
require('prismjs/plugins/line-numbers/prism-line-numbers');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-php');
require('prismjs/components/prism-scss');

import autosize from 'autosize';

import Glide from '@glidejs/glide';

(function ()
{
    'use strict';

    // If JavaScript enabled, add a class to `<html>` tag.

    document.documentElement.className = 'js';

    // Load objects as variables.

    var code = document.querySelectorAll('code[class*="language-"], [class*="language-"] code'),
        fields = document.querySelectorAll('textarea'),
        navmenu = document.getElementById('site-navigation'),
        slider = document.querySelectorAll('.glide');

    // Syntax highlighting, via 'Prism'.
    // Applies syntax highlighting to `code` HTML elements.
    // More info - https://prismjs.com.

    if (code.length) {
        Prism.highlightAll();
    }

    // Auto-growing textareas, via 'Autosize'.
    // Allows dynamic resizing of textarea height, so that it grows as based
    // on visitor input. More info - https://github.com/jackmoore/autosize.

    if (fields.length) {
        autosize(fields);
    }

    // Responsive navigation menu.

    if (navmenu) {
        var navtoggle = document.getElementById('site-navigation-toggle');

        navtoggle.addEventListener('click', function(e)
        {
            e.preventDefault();
            navtoggle.classList.toggle('site-navigation-toggle-active');
            navmenu.classList.toggle('site-navigation-open');
        });
    }

    // Slider, via 'Glide'.
    // More info - https://github.com/glidejs/glide.

    if (slider.length) {
        new Glide('.glide', {
            type: 'carousel'
        }).mount();
    }

})();

// Specific dark and light images.
// Example:
// <img src="assets/images/feature.png"
//     data-src-light="assets/images/example.png"
//     data-src-dark="assets/images/example-dark.png"
//     srcset="assets/images/example@2x.png 2x"
//     data-srcset-light="assets/images/example@2x.png 2x"
//     data-srcset-dark="assets/images/example-dark@2x.png 2x" />

function makeImagesDark()
{
    'use strict';

    $('img.color-specific').each(function() {
        $(this).attr('src', $(this).attr('data-dark-src'));
        $(this).attr('srcset', $(this).attr('data-dark-srcset'));
    });
}

function makeImagesLight()
{
    'use strict';

    $('img.color-specific').each(function() {
        $(this).attr('src', $(this).attr('data-light-src'));
        $(this).attr('srcset', $(this).attr('data-light-srcset'));
    });
}

// Detect Dark Mode/Light Mode.

function toggleDarkMode(isDark)
{
    'use strict';

    if (isDark.matches) {
        makeImagesDark();
    } else {
        makeImagesLight();
    }
}

var isDark = window.matchMedia('screen and (prefers-color-scheme: dark)');
toggleDarkMode(isDark);
isDark.addListener(toggleDarkMode);

// Switch between Dark Mode/Light Mode manually.

$('#lightswitch').on('click', function()
{
    'use strict';

    if ($('body').hasClass('darkmode')) {
        $('body').removeClass('darkmode');
        makeImagesLight();
        localStorage.removeItem("prefers-color-scheme", "dark");
        return false;
    } else {
        $('body').addClass('darkmode');
        makeImagesDark();
        localStorage.setItem("prefers-color-scheme", "dark");
        return false;
    }
});

if (localStorage.getItem("prefers-color-scheme") === "dark") {
    $('body').addClass('darkmode');
    makeImagesDark();
}
