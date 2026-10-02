module.exports = function (grunt)
{
    'use strict';

    // Load Grunt tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-stylelint');
    grunt.loadNpmTasks('grunt-terser');

    const fs = require('fs');
    const path = require('path');
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ---------------------------------------------------------------------
        // Paths
        // ---------------------------------------------------------------------

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

        // ---------------------------------------------------------------------
        // JavaScript linting
        // ---------------------------------------------------------------------

        jshint: {
            options: {
                esversion: 11
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>*.js'
            ]
        },

        // ---------------------------------------------------------------------
        // Sass
        // ---------------------------------------------------------------------

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

        // ---------------------------------------------------------------------
        // CSS linting
        // ---------------------------------------------------------------------

        stylelint: {
            options: {
                configFile: '.stylelintrc.yml'
            },
            src: ['<%= paths.src.sass %>**/*.{css,scss}']
        },

        // ---------------------------------------------------------------------
        // Copy assets
        // ---------------------------------------------------------------------

        copy: {
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

        // -------------------------------------------------------------------------
        // JavaScript bundling/minification
        // -------------------------------------------------------------------------

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
                        '<%= paths.dest.js %>app.js': ['<%= paths.src.js %>app.js']
                    }
                ]
            }
        },

        // -------------------------------------------------------------------------
        // Directories watched and tasks performed by invoking `grunt watch`
        // -------------------------------------------------------------------------

        watch: {
            sass: {
                files: '<%= paths.src.sass %>**/*.scss',
                tasks: 'css'
            },
            js: {
                files: '<%= paths.src.js %>**',
                tasks: [
                    'jshint',
                    'terser'
                ]
            }
        }

    });

    // -------------------------------------------------------------------------
    // CSS post-processing
    // -------------------------------------------------------------------------

    grunt.registerTask('postcss', 'Autoprefix and minify CSS.', async function () {
        const done = this.async();

        try {
            const files = [
                'public/assets/css/screen.css',
                'public/assets/css/print.css',
                'public/assets/css/design-patterns.css'
            ];

            for (const file of files) {
                const css = fs.readFileSync(file, 'utf8');

                const result = await postcss([
                    autoprefixer(),
                    cssnano()
                ]).process(css, {
                    from: file,
                    to: file
                });

                fs.writeFileSync(file, result.css);

                grunt.log.ok(`Processed ${file}`);
            }

            done();
        } catch (error) {
            grunt.log.error(error);
            done(false);
        }
    });

    // -------------------------------------------------------------------------
    // Clean
    // -------------------------------------------------------------------------

    grunt.registerTask('clean', 'Remove generated files.', function () {
        const paths = [
            grunt.config.get('paths.dest.css'),
            grunt.config.get('paths.dest.js')
        ];

        paths.forEach(function (path) {
            fs.rmSync(path, {
                recursive: true,
                force: true
            });
        });
    });

    // -------------------------------------------------------------------------
    // Registered tasks
    // -------------------------------------------------------------------------

    grunt.registerTask('css', [
        'stylelint',
        'sass',
        'postcss'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy:fonts',
        'css',
        'jshint',
        'terser'
    ]);

    grunt.registerTask('default', [
        'watch'
    ]);
};
