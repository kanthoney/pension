'use strict';

module.exports = function(grunt)
{
  grunt.initConfig({
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/semantic-ui-css',
            src: [ 'themes/**', 'semantic.min.css' ],
            dest: 'dist/css'
          }
        ]
      },
      dev: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/semantic-ui-css',
            src: [ 'themes/**', 'semantic.min.css' ],
            dest: 'dist/css'
          },
          { expand: true, cwd: 'build', src: 'app.js', dest: 'dist/js' }
        ]
      }
    },
    env: {
      dist: {
        NODE_ENV: 'production'
      },
      dev: {
        NODE_ENV: 'development'
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [ 'babelify' ]
        },
        files: [
          { src: 'ui/index.js', dest: 'build/app.js' }
        ]
      },
      dev: {
        options: {
          transform: [ 'babelify' ],
          debug: true
        },
        files: [
          { src: 'ui/index.js', dest: 'build/app.js' }
        ]
      }
    },
    terser: {
      dist: {
        files: [
          { expand: true, cwd: 'build', src: '*.js', dest: 'dist/js', ext: '.min.js' }
        ]
      }
    },
    pug: {
      dist: {
        options: {
          data: {
            dev: false
          }
        },
        files: [
          { expand: true, cwd: 'pug', src: '*.pug', dest: 'dist', ext: '.html' }
        ]
      },
      dev: {
        options: {
          data: {
            dev: true
          }
        },
        files: [
          { expand: true, cwd: 'pug', src: '*.pug', dest: 'dist', ext: '.html' }
        ]
      },
    },
    less: {
      dist: {
        files: [
          { expand: true, cwd: 'less', src: '*.less', dest: 'dist/css', ext: '.css' }
        ]
      },
      dev: {
        files: [
          { expand: true, cwd: 'less', src: '*.less', dest: 'dist/css', ext: '.css' }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-env');
  grunt.registerTask('dist', ['env:dist', 'pug:dist', 'less:dist', 'browserify:dist', 'terser:dist', 'copy:dist']);
  grunt.registerTask('dev', ['env:dev', 'pug:dev', 'less:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('default', 'dev');
};

