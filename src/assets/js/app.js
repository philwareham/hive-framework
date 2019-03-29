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

    const code = document.querySelectorAll('code[class*="language-"], [class*="language-"] code'),
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

    // Dark Mode.

    var isDark = window.matchMedia('screen and (prefers-color-scheme: dark)'),
        bodyClass = document.querySelector('body');

    // Specific dark and light images.
    // Example:
    // <img src="assets/img/feature.png"
    //     data-src-light="assets/img/example.png"
    //     data-src-dark="assets/img/example-dark.png"
    //     srcset="assets/img/example@2x.png 2x"
    //     data-srcset-light="assets/img/example@2x.png 2x"
    //     data-srcset-dark="assets/img/example-dark@2x.png 2x">

    function makeImagesDark()
    {
        $('img.prefers-color-scheme').each(function() {
            $(this).attr('src', $(this).attr('data-dark-src'));
            $(this).attr('srcset', $(this).attr('data-dark-srcset'));
        });
    }

    function makeImagesLight()
    {
        $('img.prefers-color-scheme').each(function() {
            $(this).attr('src', $(this).attr('data-light-src'));
            $(this).attr('srcset', $(this).attr('data-light-srcset'));
        });
    }

    // Detect Dark Mode/Light Mode.

    function toggleDarkMode(isDark)
    {
        if (isDark.matches) {
            makeImagesDark();

            console.log("In Dark Mode");
        } else {
            makeImagesLight();

            console.log("In Light Mode");
        }
    }

    toggleDarkMode(isDark);
    isDark.addListener(toggleDarkMode);

    // Check localStorage for Dark Mode preference.

    if (localStorage.getItem('prefers-color-scheme') === 'dark') {
        bodyClass.classList.add('darkmode');
        makeImagesDark();
    } else if (localStorage.getItem('prefers-color-scheme') === 'light') {
        bodyClass.classList.remove('darkmode');
    } else if (isDark.matches) {
        if (!bodyClass.classList.contains('darkmode')) {
            bodyClass.classList.add('darkmode');
            makeImagesDark();
        }
    }

    // Switch between Dark Mode/Light Mode manually.

    $('#lightswitch').on('click', function()
    {
        if (bodyClass.classList.contains('darkmode')) {
            bodyClass.classList.remove('darkmode');
            makeImagesLight();
            localStorage.setItem('prefers-color-scheme', 'light');
            return false;
        } else {
            bodyClass.classList.add('darkmode');
            makeImagesDark();
            localStorage.setItem('prefers-color-scheme', 'dark');
            return false;
        }
    });

})();
