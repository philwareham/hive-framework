(function ()
{
    'use strict';

    document.documentElement.className = 'js';

    // Detect whether jQuery v2 features required, otherwise use jQuery v1 for higher compatibility.

    var jqueryVersion = '1.11.1';

    if (typeof JSON !== 'undefined' && 'querySelector' in document && 'addEventListener' in window) {
        jqueryVersion = '2.1.1';
    }

    requirejs.config({
        paths:
        {
            'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/'+jqueryVersion+'/jquery.min',
            'jqueryui': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
            'flowplayer': 'flowplayer/flowplayer.min'
        },
        shim:
        {
            'autosize': ['jquery'],
            'cookie': ['jquery'],
            'details': ['jquery'],
            'flowplayer': ['jquery'],
            'jqueryui': ['jquery'],
            'placeholder': ['jquery'],
            'stellar': ['jquery']
        }
    });

    // Detect whether browser supports SVG format.

    define('feature', function ()
    {
        return {
            svg: function ()
            {
                return document.createElementNS || document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
            }
        };
    });

    // Detect whether user enabled 'Do No Track' in their browser, and honour it.

    define('track', function ()
    {
        return {
            allow : navigator.doNotTrack !== 'yes' && navigator.doNotTrack !== '1' && navigator.doNotTrack !== 1
        };
    });

    require(['jquery'], function ($)
    {
        // Load objects as variables.

        var code = $('pre code'),
            details = $('details'),
            fields = $('form textarea'),
            placeholder = $('textarea[placeholder], input[placeholder]'),
            player = $('.videoplayer'),
            slider = $('.rslides'),
            stellar = $('.parallax');

        /**
         * Syntax highlighting, via 'Google Code Prettify'.
         *
         * Automatically applies syntax highlighting to `pre code` HTML elements.
         * More info - https://github.com/tcollard/google-code-prettify.
         */

        if (code.length) {
            code.parent().addClass('prettyprint');

            require(['prettify'], function ()
            {
                prettyPrint();
            });
        }

        /**
         * Details polyfill, via 'jQuery Details'.
         *
         * Adds `details` and `summary` HTML elements for unsupported browsers.
         * More info - https://github.com/mathiasbynens/jquery-details.
         * Browser support info - http://caniuse.com/#feat=details.
         */

        if (details.length) {
            require(['details'], function ()
            {
                details.details();
                $('html').addClass($.fn.details.support ? 'details' : 'no-details');
            });
        }

        /**
         * Auto-growing textareas, via 'Autosize'.
         *
         * Allows dynamic resizing of textarea height, so that it grows as based on
         * visitor input. More info - https://github.com/jackmoore/autosize.
         */

        if (fields.length) {
            require(['autosize'], function ()
            {
                fields.autosize();
            });
        }

        /**
         * Placeholder polyfill, via 'jQuery Placeholder'.
         *
         * Adds `placeholder` attribute to `input` and `textarea` for unsupported browsers.
         * More info - https://github.com/mathiasbynens/jquery-placeholder.
         * Browser support info - http://caniuse.com/#feat=placeholder.
         */

        if (placeholder.length) {
            require(['placeholder'], function ()
            {
                placeholder.placeholder();
            });
        }

        /**
         * HTML5 videos (with Flash fallback), via 'Flowplayer'.
         *
         * More info - https://github.com/flowplayer/flowplayer.
         */

        if (player.length) {
            require(['flowplayer'], function ()
            {
                player.flowplayer({
                    splash: true,
                    ratio: 0.417
                });
            });
        }

        /**
         * Responsive slider, via 'ResponsiveSlides'.
         *
         * More info - https://github.com/viljamis/ResponsiveSlides.js.
         */

        if (slider.length) {
            require(['responsiveslides'], function ()
            {
                slider.responsiveSlides({
                    auto: true,             // Boolean: Animate automatically, true or false
                    speed: 1200,            // Integer: Speed of the transition, in milliseconds
                    timeout: 4800,          // Integer: Time between slide transitions, in milliseconds
                    pager: true,            // Boolean: Show pager, true or false
                    nav: true,              // Boolean: Show navigation, true or false
                    random: false,          // Boolean: Randomize the order of the slides, true or false
                    pause: false,           // Boolean: Pause on hover, true or false
                    pauseControls: false,   // Boolean: Pause when hovering controls, true or false
                    prevText: '&#8592;',    // String: Text for the "previous" button
                    nextText: '&#8594;',    // String: Text for the "next" button
                    maxwidth: '',           // Integer: Max-width of the slideshow, in pixels
                    navContainer: '',       // Selector: Where auto generated controls should be appended to, default is after the <ul>
                    manualControls: '',     // Selector: Declare custom pager navigation
                    namespace: 'rslides',   // String: change the default namespace used
                    before: function () {}, // Function: Before callback
                    after: function () {}   // Function: After callback
                });
            });
        }

        /**
         * Parallax scrolling effects, via 'Stellar.js'.
         *
         * More info - https://github.com/markdalgleish/stellar.js.
         */

        if (stellar.length) {
            require(['stellar'], function ()
            {
                $.stellar({
                    horizontalScrolling: false
                });
            });
        }
    });

    // If no SVG support, replace SVGs with PNGs.

    require(['jquery', 'feature'], function ($, supports)
    {
        if (!supports.svg) {
            $('img.svg').attr('src', function ()
            {
                return $(this).attr('src').replace('.svg', '.png');
            });
        }
    });

    /**
     * Responsive navigation menu, via 'Responsive Nav'.
     *
     * More info - https://github.com/viljamis/responsive-nav.js.
     */

    require(['responsivenav'], function ()
    {
        responsiveNav('.nav-collapse', {
            transition: 400,
            insert: 'after'
        });
    });

    /**
     * `picture` tag and/or `img` tag with `srcset` and `sizes` attributes polyfill, via 'Picturefill'.
     *
     * More info - https://github.com/scottjehl/picturefill.
     */

    require(['jquery'], function ($)
    {
        if ($('img[srcset], img[sizes], picture').length) {
            require(['picturefill']);
        }
    });

    /**
     * EU-cookie disclaimer, via 'jquery.cookie'.
     *
     * More info - https://github.com/carhartl/jquery-cookie.
     */

    require(['jquery', 'cookie'], function ($)
    {
        if (!$.cookie('acceptedCookies')) {
            var disclaimer = $('<aside id="cookie-disclaimer"><div class="container"><p><strong>This website uses cookies to enhance your experience.</strong> By continuing to use this website you agree to cookies being placed on your computer. If you wish to use this website but do not wish for cookies to be placed on your computer you can change the settings in your internet browser. <a href="#" data-action="close">Close</a>.</p></div></aside>');
            $('body').prepend(disclaimer);
            $.cookie('acceptedCookies', 1, {expires: 1461});

            disclaimer.find('a').on('click', function (e)
            {
                e.preventDefault();

                disclaimer.slideUp('fast', function ()
                {
                    disclaimer.remove();
                });
            });
        }
    });

    // Google+ '+1' button.

    require(['jquery'], function ($)
    {
        if ($('.g-plusone').length) {
            require(['https://apis.google.com/js/plusone.js']);
        }
    });

    // Twitter 'Tweet' button.

    require(['jquery'], function ($)
    {
        if ($('.twitter-share-button').length) {
            require(['https://platform.twitter.com/widgets.js']);
        }
    });

    // Google Analytics - remember to amend the user account ID number!

    require(['track'], function(track)
    {
        if (track.allow) {
            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', 'UA-xxxxxxxx-x', 'auto']);
            window._gaq.push(['_setDomainName', 'none']);
            window._gaq.push(['_gat._anonymizeIp']);
            window._gaq.push(['_setVisitorCookieTimeout', 0]);
            window._gaq.push(['_setSessionCookieTimeout', 0]);
            window._gaq.push(['_setCampaignCookieTimeout', 0]);
            window._gaq.push(['_trackPageview']);
            require(['https://www.google-analytics.com/ga.js']);
        }
    });

})();
