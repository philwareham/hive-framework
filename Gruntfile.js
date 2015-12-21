module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                sass: 'src/assets/sass/',
                js: 'src/assets/js/',
                templates: 'src/templates/'
            },
            tmp: {
                css: 'tmp/assets/css/',
                js: 'tmp/assets/js/'
            },
            dest: {
                css: 'public/assets/css/',
                js: 'public/assets/js/',
                templates: 'public/templates/'
            }
        },

        // Set up timestamp.
        opt : {
            timestamp: '<%= new Date().getTime() %>'
        },

        // Use 'config.rb' file to configure Compass.
        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // Combine any matching media queries.
        cmq: {
            css: {
                files: {
                    'tmp/assets/css': [
                        '<%= paths.tmp.css %>*.css',
                        // Ignore these non-concatenated files.
                        '!<%= paths.tmp.css %>style.css',
                        '!<%= paths.tmp.css %>jquery-ui.css'
                    ]
                }
            }
        },

        // Concatenate CSS files prior to matching media queries.
        concat: {
            css: {
                src: [
                    '<%= paths.tmp.css %>style.css',
                    '<%= paths.tmp.css %>jquery-ui.css',
                    'node_modules/flowplayer/dist/skin/minimalist.css'
                ],
                dest: '<%= paths.tmp.css %>main.css'
            }
        },

        copy: {
            // Copy files from various sources.
            js: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*'], dest: 'public/', filter: 'isFile'},
                    {expand: true, cwd: '<%= paths.src.js %>libs/', src: ['**'], dest: '<%= paths.dest.js %>'},
                    {expand: true, cwd: 'node_modules/flowplayer/dist/', src: ['**'], dest: '<%= paths.dest.js %>flowplayer/'}
                ]
            },

            // Copy Flowplayer images and fonts to CSS folder (because Flowplayer's CSS expects relative path to these).
            css: {
                files: [
                    {expand: true, cwd: 'node_modules/flowplayer/dist/skin/img/', src: ['**'], dest: '<%= paths.dest.css %>img/'},
                    {expand: true, cwd: 'node_modules/flowplayer/dist/skin/fonts/', src: ['**'], dest: '<%= paths.dest.css %>fonts/'}
                ]
            }
        },

        // Minify and copy CSS files to `public/assets/css/`.
        cssmin: {
            main: {
                files: {
                    '<%= paths.dest.css %>main.css': '<%= paths.tmp.css %>main.css',
                    '<%= paths.dest.css %>ie8.css': '<%= paths.tmp.css %>ie8.css',
                    '<%= paths.dest.css %>design-patterns.css': '<%= paths.tmp.css %>design-patterns.css'
                }
            }
        },

        // Check code quality of Gruntfile.js and site-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                browser: true,
                globals: {
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true,
                    require: true,
                    requirejs: true,
                    autosize: true,
                    responsiveNav: true,
                    prettyPrint: true
                }
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>*.js'
            ]
        },

        // Generate filename timestamps within template/mockup files.
        replace: {
            theme: {
                options: {
                    patterns: [{
                            match: 'timestamp',
                            replacement: '<%= opt.timestamp %>'
                    }]
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.templates %>',
                        src: '**',
                        dest: '<%= paths.dest.templates %>'
                    },
                    {
                        src: '<%= paths.src.js %>main.js',
                        dest: '<%= paths.tmp.js %>main.js'
                    }
                ]
            }
        },

        // Validate Sass files via sass-lint.
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: ['<%= paths.src.sass %>**/*.scss']
        },

        // Uglify and copy JavaScript files from `bower_components`, and also `main.js`, to `public/assets/js/`.
        uglify: {
            dist: {
                // Preserve all comments that start with a bang (!) or include a closure compiler style.
                options: {
                    preserveComments: 'some'
                },
                files: [
                    {
                        '<%= paths.dest.js %>main.js': ['<%= paths.tmp.js %>main.js'],
                        '<%= paths.dest.js %>autosize.js': ['node_modules/autosize/dist/autosize.js'],
                        '<%= paths.dest.js %>cookie.js': ['bower_components/jquery.cookie/jquery.cookie.js'],
                        //'<%= paths.dest.js %>cookie.js': ['bower_components/js-cookie/src/js.cookie.js'], // TODO: migrate to JS Cookie v2
                        '<%= paths.dest.js %>details.js': ['bower_components/jquery-details/jquery.details.js'],
                        '<%= paths.dest.js %>picturefill.js': ['node_modules/picturefill/dist/picturefill.js'],
                        '<%= paths.dest.js %>prettify.js': ['bower_components/google-code-prettify/src/prettify.js'],
                        '<%= paths.dest.js %>require.js': ['node_modules/requirejs/require.js'],
                        '<%= paths.dest.js %>responsivenav.js': ['bower_components/responsive-nav/responsive-nav.js'],
                        '<%= paths.dest.js %>responsiveslides.js': ['bower_components/ResponsiveSlides.js/responsiveslides.js']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/google-code-prettify/src/',
                        src: 'lang-*.js',
                        dest: '<%= paths.dest.js %>'
                    }
                ]
            }
        },

        // Directories watched and tasks performed by invoking `grunt watch`.
        watch: {
            sass: {
                files: '<%= paths.src.sass %>**/*.scss',
                tasks: 'css'
            },
            js: {
                files: '<%= paths.src.js %>**',
                tasks: ['jshint', 'uglify']
            },
            templates: {
                files: '<%= paths.src.templates %>**',
                tasks: 'replace'
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['jshint', 'css', 'copy:js', 'replace', 'uglify']);
    grunt.registerTask('css', ['sasslint', 'compass', 'concat', 'cmq', 'cssmin', 'copy:css']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'compass']);
};
