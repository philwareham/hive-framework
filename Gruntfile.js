module.exports = function (grunt)
{
    'use strict';

    // Define Sass implmentation (Dart-Sass).
    const Fiber = require('fibers');
    const sass = require('dart-sass');

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                fonts: 'src/assets/fonts/',
                sass: 'src/assets/sass/',
                js: 'src/assets/js/',
                templates: 'src/templates/'
            },
            tmp: {
                js: 'tmp/assets/js/'
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

        // Clean distribution and temporary directories to start afresh.
        clean: [
            '<%= paths.dest.css %>',
            '<%= paths.dest.js %>'
        ],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'copy:fonts',
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
                        src: ['**'],
                        dest: '<%= paths.dest.fonts %>'
                    }
                ]
            },
            // Copy JavaScript files from various sources.
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*',
                        dest: 'public/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= paths.src.js %>libs/',
                        src: '**',
                        dest: '<%= paths.dest.js %>'
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
                    jQuery: true,
                    Zepto: true,
                    define: true,
                    module: true,
                    require: true,
                    requirejs: true,
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
                fiber: Fiber,
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

        // Uglify and copy JavaScript files from `node_modules`, and also `main.js`, to `public/assets/js/`.
        uglify: {
            dist: {
                files: [
                    {
                        '<%= paths.dest.js %>main.js': ['<%= paths.dest.js %>main.js'],
                        '<%= paths.dest.js %>autosize.js': ['node_modules/autosize/dist/autosize.js'],
                        '<%= paths.dest.js %>prism.js': [
                            'node_modules/prismjs/prism.js',
                            // Add any plugins
                            'node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js',
                            // Add any additional languages
                            'node_modules/prismjs/components/prism-markup-templating.js',
                            'node_modules/prismjs/components/prism-php.js',
                            'node_modules/prismjs/components/prism-scss.js'
                        ],
                        '<%= paths.dest.js %>require.js': ['node_modules/requirejs/require.js'],
                        '<%= paths.dest.js %>slick.js': ['node_modules/slick-carousel/slick/slick.js']
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
                tasks: ['jshint', 'uglify', 'copy:js']
            },
            templates: {
                files: '<%= paths.src.templates %>**',
                tasks: 'replace'
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent', 'uglify', 'copy:js']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss', 'copy:css']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};
