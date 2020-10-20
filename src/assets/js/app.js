//import {$,jQuery} from 'jquery';
// export for others scripts to use
//window.$ = $;
//window.jQuery = jQuery;

import Prism from 'prismjs';
require('prismjs/plugins/line-numbers/prism-line-numbers');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-php');
require('prismjs/components/prism-scss');

import Glide from '@glidejs/glide';

(function()
{
    'use strict';

    // If JavaScript enabled, add a class to `<html>` tag.

    document.documentElement.className = 'js';

    // Load objects as variables.

    var code = document.querySelectorAll('code[class*="language-"], [class*="language-"] code'),
        navmenu = document.getElementById('site-navigation'),
        slider = document.querySelectorAll('.glide');

    // Syntax highlighting, via 'Prism'.
    // Applies syntax highlighting to `code` HTML elements.
    // More info - https://prismjs.com.

    if (code.length) {
        Prism.highlightAll();
    }

    // Responsive navigation menu.

    if (navmenu) {
        var navtoggle = document.getElementById('site-navigation-toggle'),
            navlist = document.getElementById('site-navigation-list');

        navtoggle.addEventListener('click', function(e)
        {
            e.preventDefault();
            navtoggle.classList.toggle('site-navigation-toggle-active');
            navmenu.classList.toggle('site-navigation-open');
        });

        navlist.addEventListener('focusin', function()
        {
            navtoggle.classList.add('site-navigation-toggle-active');
            navmenu.classList.add('site-navigation-open');
        });

        navlist.addEventListener('focusout', function()
        {
            navtoggle.classList.remove('site-navigation-toggle-active');
            navmenu.classList.remove('site-navigation-open');
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

    var bodyClass = document.body.classList,
        imgPrefers = document.querySelectorAll('img.prefers-color-scheme'),
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
        bodyClass.add('darkmode');

        for (var i = 0; i < imgPrefers.length; i++) {
            if (imgPrefers[i].getAttribute('data-src-dark')) {
                imgPrefers[i].setAttribute('src', imgPrefers[i].getAttribute('data-src-dark'));
            }

            if (imgPrefers[i].getAttribute('data-srcset-dark')) {
                imgPrefers[i].setAttribute('srcset', imgPrefers[i].getAttribute('data-srcset-dark'));
            }
        }
    }

    function makeImagesLight()
    {
        bodyClass.remove('darkmode');

        for (var i = 0; i < imgPrefers.length; i++) {
            if (imgPrefers[i].getAttribute('data-src-light')) {
                imgPrefers[i].setAttribute('src', imgPrefers[i].getAttribute('data-src-light'));
            }

            if (imgPrefers[i].getAttribute('data-srcset-light')) {
                imgPrefers[i].setAttribute('srcset', imgPrefers[i].getAttribute('data-srcset-light'));
            }
        }
    }

    // Detect and change Dark Mode/Light Mode (but only if no localStorage preference).

    function toggleDarkMode(isDark)
    {
        if (localStorage.getItem('prefers-color-scheme') === null) {
            if (isDark.matches) {
                makeImagesDark();
            } else {
                if (bodyClass.contains('darkmode')) {
                    makeImagesLight();
                }
            }
        }
    }

    toggleDarkMode(isDark);
    isDark.addListener(toggleDarkMode);

    // Check localStorage for Dark Mode/Light Mode preference.

    if (localStorage.getItem('prefers-color-scheme') === 'dark') {
        makeImagesDark();
    }

    // Switch between Dark Mode/Light Mode manually.

    if (lightSwitch) {
        lightSwitch.addEventListener('click', function(e)
        {
            if (bodyClass.contains('darkmode')) {
                makeImagesLight();
                localStorage.setItem('prefers-color-scheme', 'light');
            } else {
                makeImagesDark();
                localStorage.setItem('prefers-color-scheme', 'dark');
            }

            e.preventDefault();
        });
    }
})();

// Hide/show header on scroll

(function(document, window) {
	'use strict';

	var element = document.getElementById('dynamic-header');

	if (!element) {
        return true;
    }

	var elHeight		= 0,
		elTop			= 0,
		dHeight			= 0,
		wHeight			= 0,
		wScrollCurrent	= 0,
		wScrollBefore	= 0,
		wScrollDiff		= 0;

	window.addEventListener('scroll', function() {
		elHeight		= element.offsetHeight;
		dHeight			= document.body.offsetHeight;
		wHeight			= window.innerHeight;
		wScrollCurrent	= window.pageYOffset;
		wScrollDiff		= wScrollBefore - wScrollCurrent;
		elTop			= parseInt(window.getComputedStyle(element).getPropertyValue('top')) + wScrollDiff;

		if( wScrollCurrent <= 0 ) {
			element.style.top = '0px';
        } else if (wScrollDiff > 0) {
			element.style.top = (elTop > 0 ? 0 : elTop) + 'px';
        } else if (wScrollDiff < 0) {
			if (wScrollCurrent + wHeight >= dHeight - elHeight) {
				element.style.top = ((elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0) + 'px';
            } else {
				element.style.top = (Math.abs(elTop) > elHeight ? - elHeight : elTop) + 'px';
            }
		}

		wScrollBefore = wScrollCurrent;
	});

}(document, window, 0));
