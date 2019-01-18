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
    // More info - http://prismjs.com.

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
