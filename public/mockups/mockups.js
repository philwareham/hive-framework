$.uiBackCompat = false;

// This example file is used to demonstrate all available jQuery UI components
// on the design patterns page.

// Ascertain the page direction (LTR or RTL).
var langdir = document.documentElement.dir;

$(function()
{
    // Spoof RTL on English language `label` tags.
    // This isn't needed when viewing in proper RTL languages.

    $('[dir="rtl"] label').attr('dir', 'rtl');

    // jQuery UI interactions.

    // Draggable.

    $('.jquery-ui-draggable').draggable({
        cursor: 'move'
    });

    // Resizable.

    if (langdir === 'rtl') {
        $('.jquery-ui-resizable').resizable({
            handles: 'w, s, sw',
            minWidth: 200
        });
    } else {
        $('.jquery-ui-resizable').resizable({
            minWidth: 200
        });
    };

    // Selectable.

    $('.jquery-ui-selectable').selectable();

    // Sortable.

    $('.jquery-ui-sortable').sortable({
        placeholder: 'ui-sortable-placeholder',
        cursor: 'ns-resize'
    }).disableSelection();

    // jQuery UI widgets.

    // Accordion.

    $('.jquery-ui-accordion').accordion({
        header: 'h3'
    });

    // Accordion RTL.
    // Flip positioning of accordion state icons when in RTL langauges.

    $('[dir="rtl"] .jquery-ui-accordion').accordion({
        icons: {
            'header': 'ui-icon-triangle-1-w',
            'activeHeader': 'ui-icon-triangle-1-s'
        }
    });

    // Autocomplete.

    var countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic', 'Congo, Republic of the', 'Costa Rica', 'Cote d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Mongolia', 'Morocco', 'Monaco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', ' Sao Tome', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    $('#autocomplete-country').autocomplete({
        source: countryList
    });

    // Button.

    $('.jquery-ui-button').button();

    // Icon button.

    $('.jquery-ui-button-icon-only').button({
        showLabel: false,
        icon: 'ui-icon-gear'
    });

    $('.jquery-ui-button-icon-left').button({
        icon: 'ui-icon-locked'
    });

    $('.jquery-ui-button-icon-right').button({
        icon: 'ui-icon-disk',
        iconPosition: 'end'
    });

    // Checkboxradio.

    $('.jquery-ui-checkboxradio-checkbox1 input').checkboxradio();

    $('.jquery-ui-checkboxradio-checkbox2 input').checkboxradio({
        icon: false
    });

    $('.jquery-ui-checkboxradio-radio input').checkboxradio();

    // Controlgroup.

    $('.jquery-ui-controlgroup').controlgroup();

    $('.jquery-ui-controlgroup-vertical').controlgroup({
        direction: 'vertical'
    });

    // Datepicker.

    $('.jquery-ui-datepicker').datepicker().children().show();

    // Dialog (basic).

    $('#jquery-ui-dialog').dialog({
        autoOpen: false,
        minWidth: 300
    });

    // Dialog (modal) link.

    $('#jquery-ui-dialog-link').click(function ()
    {
        $('#jquery-ui-dialog').dialog('open');
        return false;
    });

    // Dialog (modal).

    $('#jquery-ui-dialog-modal').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        buttons: {
            Cancel: function ()
            {
                $(this).dialog('close');
            },
            Ok: function ()
            {
                $(this).dialog('close');
            }
        }
    });

    // Dialog (modal) link.

    $('#jquery-ui-dialog-modal-link').click(function ()
    {
        $('#jquery-ui-dialog-modal').dialog('open');
        return false;
    });

    // Menu.

    if (langdir === 'rtl') {
        $('.jquery-ui-menu').menu({
            position: {
                my: 'right top',
                at: 'left top-1'
            },
            icons: {
                submenu: 'ui-icon-caret-1-w'
            }
        });
    } else {
        $('.jquery-ui-menu').menu({
            position: {
                at: 'right top-1'
            }
        });
    };

    // Progressbar.

    $('.jquery-ui-progressbar').progressbar({
        value: 37
    });

    // Progressbar (indeterminate).

    $('.jquery-ui-progressbar2').progressbar({
        value: false
    });

    $('.jquery-ui-progressbar-animate').click(function (event)
    {
        var randNum = Math.random() * 90;
        $('.jquery-ui-progressbar div').animate({
            width: randNum + '%'
        });
        event.preventDefault();
    });

    // Selectmenu.

    if (langdir === 'rtl') {
        $('.jquery-ui-selectmenu').selectmenu({
            position: {
                my: 'left top',
                at: 'right bottom'
            }
        });
    } else {
        $('.jquery-ui-selectmenu').selectmenu();
    };

    // Slider - horizontal.

    $('.jquery-ui-slider-horizontal').slider({
        range: true,
        values: [17, 67]
    });

    // Slider - vertical.

    $('.jquery-ui-slider-vertical > span').each(function ()
    {
        var value = parseInt($(this).text());
        $(this).empty().slider({
            value: value,
            range: 'min',
            animate: true,
            orientation: 'vertical'
        });
    });

    // Spinner.

    $('#jquery-ui-spinner').spinner({
        spin: function (event, ui)
        {
            if (ui.value > 10)
            {
                $(this).spinner('value', -10);
                return false;
            }
            else if (ui.value < -10)
            {
                $(this).spinner('value', 10);
                return false;
            }
        }
    });

    // Tabs - horizontal.

    $('.jquery-ui-tabs').tabs();

    // Tabs - vertical.

    $('.jquery-ui-tabs-vertical').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');

    // Tooltips.

    $('.jquery-ui-tooltip').tooltip();

    // Input range slider values.

    var rangeRangeInput = document.getElementById('range'),
        rangeTextInput = document.getElementById('range-number');

    rangeRangeInput.oninput = function () {
        rangeTextInput.value = this.value;
    }

    rangeTextInput.oninput = function () {
        rangeRangeInput.value = this.value;
    }
});
