module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      demo: {
        files: {
          './examples/browserify/example.js': ['./examples/browserify/index.js']
        },
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      }
    },
    copy: {
      raw: {
        expand: true,
        flatten: true,
        src: [
          './angular.hammer.js',
          './node_modules/hammerjs/hammer.js',
          './node_modules/angular/angular.js'
        ],
        dest: './examples/raw/'
      },
      requirejs: {
        expand: true,
        flatten: true,
        src: [
          './angular.hammer.js',
          './node_modules/hammerjs/hammer.js',
          './node_modules/angular/angular.js'
        ],
        dest: './examples/requirejs/'
      },
      webpack: {
        expand: true,
        flatten: true,
        src: [
          './angular.hammer.js',
          './node_modules/hammerjs/hammer.js',
          './node_modules/angular/angular.js'
        ],
        dest: './examples/webpack/'
      }
    },
    jsdoc : {
      dist : {
        src: ['./angular.hammer.js'],
        dest: './doc',
        options: {
          configure: 'jsdoc.json'
        }
      }
    },
    nodemon: {
      demo: {
        script:'server.js'
      }
    },
    requirejs: {
      demo: {

      }
    },
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: './angular.hammer.min.js.map',
          mangle: true,
          preserveComments: require('uglify-save-license')
        },
        './angular.hammer.min.js': ['./angular.hammer.js']
      },
      browserify: {
        options: {
          sourceMap: true,
          sourceMapName: './examples/browserify/example.min.js.map',
          mangle: true
        },
        './examples/browserify/example.js': ['./examples/browserify/example.js']
      },
      raw: {
        options: {
          sourceMap: true,
          sourceMapName: './examples/raw/example.min.js.map',
          mangle: true
        },
        './examples/raw/example.js': [
          './examples/raw/angular.js',
          './examples/raw/hammer.js',
          './examples/raw/angular.hammer.js'
        ]
      },
      requirejs: {
        options: {
          sourceMap: true,
          sourceMapName: './examples/requirejs/example.min.js.map',
          mangle: true
        },
        './examples/requirejs/example.js': ['./examples/requirejs/example.js']
      },
      webpack: {
        options: {
          sourceMap: true,
          sourceMapName: './examples/webpack/example.min.js.map',
          mangle: true
        },
        './examples/webpack/example.js': ['./examples/webpack/example.js']
      }
    },
    webpack: {
      demo: {

      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['uglify', 'jsdoc']);
  grunt.registerTask('demo', ['copy', 'browserify', 'requirejs', 'webpack', 'nodemon']);
  grunt.registerTask('demo-min', ['copy', 'browserify', 'requirejs', 'webpack', 'uglify', 'nodemon']);
  grunt.registerTask('demo-browserify', ['browserify', 'nodemon']);
  grunt.registerTask('demo-browserify-min', ['browserify', 'uglify:browserify', 'nodemon']);
  grunt.registerTask('demo-raw', ['copy:raw', 'nodemon']);
  grunt.registerTask('demo-raw-min', ['copy:raw', 'uglify:raw', 'nodemon']);
  grunt.registerTask('demo-require', ['copy:requirejs', 'requirejs', 'nodemon']);
  grunt.registerTask('demo-require-min', ['copy:requirejs', 'requirejs', 'uglify:requirejs', 'nodemon']);
  grunt.registerTask('demo-webpack', ['copy:webpack', 'webpack', 'nodemon']);
  grunt.registerTask('demo-webpack-min', ['copy:webpack', 'webpack', 'uglify:webpack', 'nodemon']);
}