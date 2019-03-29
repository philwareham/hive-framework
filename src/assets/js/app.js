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

(function()
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

    var bodyClass = document.querySelector('body'),
        //imgPrefers = document.querySelectorAll('img.prefers-color-scheme'),
        isDark = window.matchMedia('screen and (prefers-color-scheme: dark)'),
        lightSwitch = document.getElementById('lightswitch');

    // Specific dark and light images.
    // Example:
    // <img class="prefers-color-scheme"
    //     src="assets/img/feature.png"
    //     data-src-light="assets/img/example.png"
    //     data-src-dark="assets/img/example-dark.png"
    //     srcset="assets/img/example@2x.png 2x"
    //     data-srcset-light="assets/img/example@2x.png 2x"
    //     data-srcset-dark="assets/img/example-dark@2x.png 2x">

    function makeImagesDark()
    {
        bodyClass.classList.add('darkmode');

        //imgPrefers.forEach(function(element) {
            // TODO
        //});

        $('img.prefers-color-scheme').each(function() {
            $(this).attr('src', $(this).attr('data-src-dark'));
            $(this).attr('srcset', $(this).attr('data-srcset-dark'));
        });

        console.log("In Dark Mode IMGs");
    }

    function makeImagesLight()
    {
        bodyClass.classList.remove('darkmode');

        $('img.prefers-color-scheme').each(function() {
            $(this).attr('src', $(this).attr('data-src-light'));
            $(this).attr('srcset', $(this).attr('data-srcset-light'));
        });

        console.log("In Light Mode IMGs");
    }

    // Detect and change Dark Mode/Light Mode (but only if no localStorage preference).

    function toggleDarkMode(isDark)
    {
        if (localStorage.getItem('prefers-color-scheme') === null) {
            if (isDark.matches) {
                makeImagesDark();
                console.log("In Dark Mode via localStorage null and isDark");
            } else {
                if (bodyClass.classList.contains('darkmode')) {
                    makeImagesLight();
                }

                console.log("In Light Mode via localStorage null and isDark");
            }
        }
    }

    toggleDarkMode(isDark);
    isDark.addListener(toggleDarkMode);

    // Check localStorage for Dark Mode/Light Mode preference.

    if (localStorage.getItem('prefers-color-scheme') === 'dark') {
        makeImagesDark();
        console.log("In Dark Mode via localStorage");
    }

    // Switch between Dark Mode/Light Mode manually.

    lightSwitch.addEventListener('click', function(e)
    {
        if (bodyClass.classList.contains('darkmode')) {
            makeImagesLight();
            localStorage.setItem('prefers-color-scheme', 'light');
            console.log("In Light Mode via lightswitch");
        } else {
            makeImagesDark();
            localStorage.setItem('prefers-color-scheme', 'dark');
            console.log("In Dark Mode via lightswitch");
        }

        e.preventDefault();
    });

})();
