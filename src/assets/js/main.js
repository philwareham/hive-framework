(function ()
{
    'use strict';

    document.documentElement.className = 'js';

    // Detect whether jQuery v2 features required, otherwise use jQuery v1 for higher compatibility.

    var jqueryVersion = '1.12.0';

    if (typeof JSON !== 'undefined' && 'querySelector' in document && 'addEventListener' in window) {
        jqueryVersion = '2.2.0';
    }

    requirejs.config({
        paths:
        {
            'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/'+jqueryVersion+'/jquery.min',
            'jqueryui': 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
            'flowplayer': 'flowplayer/flowplayer.min'
        },
        shim:
        {
            'cookie': ['jquery'],
            'jqueryui': ['jquery']
        }
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
            require(['flowplayer'], function ()
            {
                player.flowplayer({
                    splash: true
                });
            });
        }

        // Slider, via 'Lory'.
        // More info - https://github.com/meandmax/lory.

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

    // EU-cookie disclaimer, via 'jquery.cookie'.
    // More info - https://github.com/carhartl/jquery-cookie.

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
