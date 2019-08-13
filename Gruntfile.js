module.exports = function (grunt)
{
    'use strict';

    // Define Sass implmentation (Dart-Sass).
    const sass = require('sass');

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                sass: 'src/assets/sass/',
                fonts: 'src/assets/fonts/',
                js: 'src/assets/js/',
                templates: 'src/templates/'
            },
            dest: {
                css: 'public/assets/css/',
                fonts: 'public/assets/fonts/',
                js: 'public/assets/js/',
                templates: 'public/templates/'
            }
        },

        // Set up timestamp.
        opt : {
            timestamp: '<%= new Date().getTime() %>'
        },

        // Bundle up the JavaScript.
        browserify: {
            development: {
                src: [
                    '<%= paths.src.js %>app.js'
                ],
                dest: '<%= paths.dest.js %>app.js',
                options: {
                    browserifyOptions: {
                        debug: false
                    },
                    transform: [[
                        'babelify', {
                            'presets': ['@babel/preset-env']
                        }
                    ]]
                }
            }
        },

        // Clean distribution and temporary directories to start afresh.
        clean: [
            '<%= paths.dest.css %>',
            '<%= paths.dest.js %>'
        ],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'browserify',
                'copy:fonts',
                'copy:configs',
                'css',
                'jshint',
                'replace'
            ]
        },

        copy: {
            // Copy fonts.
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.fonts %>',
                        src: '**',
                        dest: '<%= paths.dest.fonts %>'
                    }
                ]
            },
            // Copy Slick icon font to CSS folder (because Slick's CSS expects relative path to this).
            css: {
                files: [
                    {
                        src: 'node_modules/slick-carousel/slick/fonts/slick.woff',
                        dest: '<%= paths.dest.css %>fonts/slick.woff'
                    }
                ]
            },
            // Server configs.
            configs: {
                files: [
                    {
                        src: 'node_modules/apache-server-configs/dist/.htaccess',
                        dest: 'src/docs/htaccess.txt'
                    }
                ]
            }
        },

        // Check code quality of Gruntfile.js and site-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                esversion: 6,
                forin: true,
                globals: {
                    $: true,
                    console: true, // Comment this out for production code.
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true,
                    require: true,
                    autosize: true,
                    Prism: true
                },
                latedef: true,
                noarg: true,
                nonew: true,
                strict: true,
                undef: true,
                unused: true
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>*.js'
            ]
        },

        // Add vendor prefixed styles and other post-processing transformations.
        postcss: {
            options: {
                processors: [
                    require('autoprefixer'),
                    require("css-mqpacker"),
                    require('cssnano')
                ]
            },
            dist: {
                src: '<%= paths.dest.css %>*.css'
            }
        },

        // Generate filename timestamps within templates files and main.js.
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
                        dest: '<%= paths.dest.js %>main.js'
                    }
                ]
            }
        },

        // Sass configuration.
        sass: {
            options: {
                implementation: sass,
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },
            dist: {
                files: [
                    {'<%= paths.dest.css %>style.css': '<%= paths.src.sass %>style.scss'},
                    {'<%= paths.dest.css %>design-patterns.css': '<%= paths.src.sass %>design-patterns.scss'}
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

        // Minify `app.js`.
        uglify: {
            dist: {
                files: [
                    {
                        '<%= paths.dest.js %>app.js': ['<%= paths.dest.js %>app.js']
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
                tasks: [
                    'jshint',
                    'browserify',
                    'uglify'
                ]
            },
            templates: {
                files: '<%= paths.src.templates %>**',
                tasks: 'replace'
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent', 'uglify']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss', 'copy:css']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['build']);
};
