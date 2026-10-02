module.exports = function (grunt) {
    'use strict';

    const fs = require('fs');
    const postcss = require('postcss');
    const autoprefixer = require('autoprefixer');
    const cssnano = require('cssnano');

    // -------------------------------------------------------------------------
    // Load Grunt tasks
    // -------------------------------------------------------------------------

    [
        'grunt-contrib-copy',
        'grunt-contrib-jshint',
        'grunt-sass',
        'grunt-stylelint',
        'grunt-terser'
    ].forEach(grunt.loadNpmTasks);

    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        paths: {
            src: {
                sass: 'src/assets/sass',
                fonts: 'src/assets/fonts',
                js: 'src/assets/js'
            },

            dest: {
                css: 'public/assets/css',
                fonts: 'public/assets/fonts',
                js: 'public/assets/js'
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
                '<%= paths.src.js %>/**/*.js'
            ]
        },

        // ---------------------------------------------------------------------
        // Sass compilation
        // ---------------------------------------------------------------------

        sass: {
            options: {
                implementation: require('sass'),
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },

            dist: {
                files: {
                    '<%= paths.dest.css %>/screen.css':
                        '<%= paths.src.sass %>/screen.scss',

                    '<%= paths.dest.css %>/print.css':
                        '<%= paths.src.sass %>/print.scss',

                    '<%= paths.dest.css %>/design-patterns.css':
                        '<%= paths.src.sass %>/design-patterns.scss'
                }
            }
        },

        // ---------------------------------------------------------------------
        // CSS linting
        // ---------------------------------------------------------------------

        stylelint: {
            options: {
                configFile: '.stylelintrc.yml'
            },

            src: [
                '<%= paths.src.sass %>/**/*.scss',
                '<%= paths.src.sass %>/**/*.css'
            ]
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
                        src: '**/*',
                        dest: '<%= paths.dest.fonts %>/'
                    }
                ]
            }
        },

        // ---------------------------------------------------------------------
        // JavaScript minification
        // ---------------------------------------------------------------------

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
                files: {
                    '<%= paths.dest.js %>/app.js':
                        '<%= paths.src.js %>/app.js'
                }
            }
        }
    });

    // -------------------------------------------------------------------------
    // CSS post-processing
    // -------------------------------------------------------------------------

    grunt.registerTask(
        'postcss',
        'Autoprefix and minify CSS.',
        async function () {
            const done = this.async();

            const cssFiles = [
                `${grunt.config.get('paths.dest.css')}/screen.css`,
                `${grunt.config.get('paths.dest.css')}/print.css`,
                `${grunt.config.get('paths.dest.css')}/design-patterns.css`
            ];

            try {
                for (const file of cssFiles) {
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
        }
    );

    // -------------------------------------------------------------------------
    // Clean
    // -------------------------------------------------------------------------

    grunt.registerTask(
        'clean',
        'Remove generated files.',
        function () {
            const destinations = grunt.config.get('paths.dest');

            [
                destinations.css,
                destinations.fonts,
                destinations.js
            ].forEach((directory) => {
                fs.rmSync(directory, {
                    recursive: true,
                    force: true
                });
            });
        }
    );

    // -------------------------------------------------------------------------
    // Composite tasks
    // -------------------------------------------------------------------------

    grunt.registerTask('css', [
        'stylelint',
        'sass',
        'postcss'
    ]);

    grunt.registerTask('js', [
        'jshint',
        'terser'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy:fonts',
        'css',
        'js'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
