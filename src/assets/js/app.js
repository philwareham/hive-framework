var $ = require('jquery/dist/jquery');

require('jquery-ui-dist/jquery-ui');

import Prism from 'prismjs';
require('prismjs/plugins/line-numbers/prism-line-numbers');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-php');
require('prismjs/components/prism-scss');

//autosize/dist/autosize.js
//slick-carousel/slick/slick.js

(function ()
{
    'use strict';

    // If JavaScript enabled, add a class to `<html>` tag.

    document.documentElement.className = 'js';

    // Load objects as variables.

    var code = document.querySelectorAll('code[class*="language-"], [class*="language-"] code'),
        fields = $('textarea'),
        navmenu = document.getElementById('site-navigation'),
        slider = $('.slider');

    // Syntax highlighting, via 'Prism'.
    // Applies syntax highlighting to `code` HTML elements.
    // More info - http://prismjs.com.

    if (code.length) {
        Prism.highlightAll();
    }

    // TODO AUTOSIZE

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

    // TODO SLICK

})();
