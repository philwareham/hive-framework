module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    // Define Rollup plugins. TODO: Migrate to this when PrismJS becomes an ESM.
    //const nodeResolve = require('@rollup/plugin-node-resolve').default;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                sass: 'src/assets/sass/',
                fonts: 'src/assets/fonts/',
                js: 'src/assets/js/'
            },
            dest: {
                css: 'public/assets/css/',
                fonts: 'public/assets/fonts/',
                js: 'public/assets/js/'
            }
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
                'css',
                'jshint'
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
            }
        },

        // Check code quality of Gruntfile.js and site-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                esversion: 8,
                forin: true,
                globals: {
                    $: true,
                    console: true,
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true,
                    require: true,
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
                    require('cssnano')
                ]
            },
            dist: {
                src: '<%= paths.dest.css %>*.css'
            }
        },

        // Bundle up the JavaScript. TODO: Migrate to this when PrismJS becomes an ESM.
        //rollup: {
        //    options: {
        //        plugins: [
        //            nodeResolve()
        //        ],
        //        format: 'iife',
        //		  sourceMap: false
        //	  },
        //    files: {
        //        src: '<%= paths.src.js %>app.js',
        //        dest: '<%= paths.dest.js %>app.js'
        //    }
        //},

        // Sass configuration.
        sass: {
            options: {
                implementation: require('sass'),
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },
            dist: {
                files: [
                    {'<%= paths.dest.css %>screen.css': '<%= paths.src.sass %>screen.scss'},
                    {'<%= paths.dest.css %>print.css': '<%= paths.src.sass %>print.scss'},
                    {'<%= paths.dest.css %>design-patterns.css': '<%= paths.src.sass %>design-patterns.scss'}
                ]
            }
        },

        // Validate CSS files via stylelint.
        stylelint: {
            options: {
                configFile: '.stylelintrc.yml'
            },
            src: ['<%= paths.src.sass %>**/*.{css,scss}']
        },

        // Minify `app.js`.
        terser: {
            options: {
                ecma: 2015,
                compress: {
                    booleans_as_integers: true,
                    drop_console: true
                },
                format: {
                    comments: false
                }
            },
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
                    'terser'
                ]
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent', 'terser']);
    grunt.registerTask('css', ['stylelint', 'sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['build']);
};
