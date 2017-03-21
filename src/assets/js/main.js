(function ()
{
    'use strict';

    document.documentElement.className = 'js';

    requirejs.config({
        paths:
        {
            'jquery': 'https://code.jquery.com/jquery-3.2.1.min',
            'jqueryui': 'https://code.jquery.com/ui/1.12.1/jquery-ui.min',
            'flowplayer': 'https://releases.flowplayer.org/7.0.2/flowplayer.min'
        },
        shim:
        {
            'jqueryui': ['jquery']
        }
    });

    // Detect whether user enabled 'Do No Track' in their browser, and honour it.

    define('track', function ()
    {
        return {
            allow : navigator.doNotTrack !== 'yes' && navigator.doNotTrack !== '1' && window.doNotTrack !== 'yes' && window.doNotTrack !== '1'
        };
    });

    require(['jquery'], function ($)
    {
        // Load objects as variables.

        var code = $('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),
            fields = $('textarea'),
            player = $('.videoplayer'),
            slider = $('.slider');

        // Syntax highlighting, via 'Prism'.
        // Applies syntax highlighting to `code` HTML elements.
        // More info - http://prismjs.com.

        if (code.length) {
            require(['prism'], function ()
            {
                Prism.highlightAll();
            });
        }

        // Auto-growing textareas, via 'Autosize'.
        // Allows dynamic resizing of textarea height, so that it grows as based
        // on visitor input. More info - https://github.com/jackmoore/autosize.

        if (fields.length) {
            require(['autosize'], function (autosize)
            {
                autosize(fields);
            });
        }

        // HTML5 videos (with Flash fallback), via 'Flowplayer'.
        // More info - https://github.com/flowplayer/flowplayer.

        if (player.length) {
            require(['jquery', 'flowplayer'], function ()
            {
                player.flowplayer({
                    splash: true
                });
            });
        }

        // Slider, via 'Slick'.
        // More info - https://kenwheeler.github.io/slick/.

        if (slider.length) {
            require(['slick'], function ()
            {
                slider.slick({
                    //accessibility: true,
                    //adaptiveHeight: false,
                    //appendArrows: $(element),
                    //appendDots: $(element),
                    //arrows: true,
                    //asNavFor: null,
                    //prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    //nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    //autoplay: false,
                    //autoplaySpeed: 3000,
                    //centerMode: false,
                    //centerPadding: '50px',
                    //cssEase: 'ease',
                    //customPaging: function(slider, i) {
                    //    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                    //},
                    dots: true,
                    //dotsClass: 'slick-dots',
                    //draggable: true,
                    easing: 'swing',
                    //edgeFriction: 0.35,
                    //fade: false,
                    //focusOnSelect: false,
                    //infinite: true,
                    //initialSlide: 0,
                    //lazyLoad: 'ondemand',
                    //mobileFirst: false,
                    //pauseOnHover: true,
                    //pauseOnDotsHover: false,
                    //respondTo: 'window',
                    //responsive: null,
                    //rows: 1,
                    //rtl: false,
                    //slide: '',
                    //slidesPerRow: 1,
                    //slidesToShow: 1,
                    //slidesToScroll: 1,
                    speed: 300
                    //swipe: true,
                    //swipeToSlide: false,
                    //touchMove: true,
                    //touchThreshold: 5,
                    //useCSS: true,
                    //useTransform: false,
                    //variableWidth: false,
                    //vertical: false,
                    //verticalSwiping: false,
                    //waitForAnimate: true,
                    //zIndex: 1000
                });
            });
        }

    });

    // Responsive navigation menu, via 'Responsive Nav'.
    // More info - https://github.com/viljamis/responsive-nav.js.

    require(['responsivenav'], function ()
    {
        responsiveNav('.site-navigation', {
            transition: 400,
            insert: 'after',
            navClass: 'site-navigation'
        });
    });

    // `picture` tag and/or `img` tag with `srcset` and `sizes` attributes polyfill, via 'Picturefill'.
    // More info - https://github.com/scottjehl/picturefill.

    require(['jquery'], function ($)
    {
        if ($('img[srcset], img[sizes], picture').length) {
            require(['picturefill']);
        }
    });

    // Google+ '+1' button.

    require(['jquery'], function ($)
    {
        if ($('.g-plusone').length) {
            require(['https://apis.google.com/js/platform.js']);
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
