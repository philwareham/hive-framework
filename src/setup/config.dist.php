<?php

// Textpattern config.

$txpcfg['db'] = '';
$txpcfg['user'] = '';
$txpcfg['pass'] = '';
$txpcfg['host'] = 'localhost';
$txpcfg['table_prefix'] = '';
$txpcfg['txpath'] = '/path/to/txpmag-website/public/textpattern';
$txpcfg['dbcharset'] = 'utf8';

// Hide parts of admin-side we don't need
#define('hive_theme_hide_preview_tabs_group', true);
#define('hive_theme_hide_advanced_group', true);
#define('hive_theme_hide_keywords_field', true);
#define('hive_theme_hide_image_caption', true);
#define('hive_theme_hide_tag_builder_column', true);
#define('hive_theme_hide_form_preview', true);

// Configures rah_cache. Add this after you have installed Textpattern *and* rah_cache.

if (!class_exists('Rah_Cache_Handler'))
{
    include txpath . '/../../vendor/rah/rah_cache/src/Rah/Cache/Handler.php';

    class TXPMag_Cache_Config extends Rah_Cache_Config
    {
        public function __construct()
        {
            $this->directory = txpath . '/../../cache';
        }
    }

    new Rah_Cache_Handler(new TXPMag_Cache_Config);
}