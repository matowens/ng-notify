'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        jshint: {
            files: [
                'Gruntfile.js',
                'app/scripts/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            dist: ['dist'],
            temp: ['.temp'],
            partials: ['dist/partials/**/*'],
            images: ['dist/images/**/*']
        },

        copy: {
            build: {
                src: 'app/.htaccess',
                dest: 'dist/.htaccess'
            }, 
            styles: {
                files: [{
                    flatten: true,
                    expand: true,
                    cwd: 'app/bower_components/',
                    src: [
                        'pure/base.css',
                        'pure/grids-responsive.css',
                        'font-awesome/css/font-awesome.css', 
                        'angular/angular-csp.css'
                    ],
                    dest: '.temp/'
                }]
            },
            scripts: {
                files: [
                    { 
                        expand: true, 
                        cwd: 'app/scripts/controllers/', 
                        src: ['**/*.js'], 
                        dest: 'dist/scripts/controllers/' 
                    },
                    { 
                        expand: true, 
                        cwd: 'app/scripts/directives/', 
                        src: ['**/*.js'],
                        dest: 'dist/scripts/directives/' 
                    },
                    { 
                        expand: true, 
                        cwd: 'app/scripts/filters/', 
                        src: ['**/*.js'], 
                        dest: 'dist/scripts/filters/' 
                    },
                    { 
                        expand: true, 
                        cwd: 'app/scripts/services/', 
                        src: ['**/*.js'], 
                        dest: 'dist/scripts/services/' 
                    }
                ]
            },
            fonts: {
                files: [
                    { 
                        expand: true, 
                        cwd: 'app/bower_components/font-awesome/fonts/', 
                        src: ['*'], 
                        dest: 'dist/fonts/' 
                    },
                    { 
                        expand: true, 
                        cwd: 'app/fonts/', 
                        src: ['*'], 
                        dest: 'dist/fonts/' 
                    }
                ]
            }
        },

        requirejs: {
            build: {
                options: {
                    baseUrl: 'app/scripts',
                    name: 'config',
                    mainConfigFile: 'app/scripts/config.js',
                    out: 'dist/scripts/main.min.js',
                    insertRequire: ['app'],
                    findNestedDependencies: true
                }
            }
        },

        sass: {
            build: {
                files: {
                    '.temp/main.css': 'app/styles/main.sass'
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'dist/styles/main.min.css': '.temp/*.css'
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    '.temp/index.html': 'app/index.html'
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                files: {
                    'dist/index.html': '.temp/index.html'
                }
            },
            partials: {
                files: [{
                  expand: true,
                  cwd: 'app/partials/',
                  src: ['*.html'],
                  dest: 'dist/partials/',
                  ext: '.html'
                }]
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['**/*'],
                    dest: 'dist/images/'
                }]
            }
        },

        watch: {
            scripts: {
                files: ['app/scripts/**/*.js'],
                tasks: ['doScripts', 'clean:temp']
            },
            styles: {
                files: ['app/styles/**/*.sass'],
                tasks: ['doStyles', 'clean:temp']
            },
            components: {
                files: ['app/bower_components/**/*.js','app/bower_components/**/*.css'],
                tasks: ['doComponents']
            },
            html: {
                files: ['app/partials/**/*.html', 'app/*.html'],
                tasks: ['doHtml']
            },
            images: {
                files: ['app/images/**/*'],
                tasks: ['doImages']
            }
        }

    });

    grunt.registerTask('build', [
        'jshint',
        'clean:dist', 
        'copy',
        'requirejs', 
        'sass',
        'cssmin',
        'processhtml',
        'htmlmin',
        'imagemin',
        'clean:temp'
    ]);

    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'watch']);

};
