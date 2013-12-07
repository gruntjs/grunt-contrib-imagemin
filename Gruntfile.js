/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      test: ['tmp']
    },
    imagemin: {
      dist: {
        files: {
          'tmp/test.png': 'test/fixtures/test.png',
          'tmp/test.jpg': 'test/fixtures/test.jpg',
          'tmp/test.gif': 'test/fixtures/test.gif',
          'tmp/test-uppercase.PNG': 'test/fixtures/test-uppercase.PNG',
          'tmp/test-uppercase.JPG': 'test/fixtures/test-uppercase.JPG',
          'tmp/test-uppercase.GIF': 'test/fixtures/test-uppercase.GIF',
          'tmp/test-optimized.png': 'test/fixtures/test-optimized.png',
          'tmp/test-optimized.jpg': 'test/fixtures/test-optimized.jpg',
          'tmp/test-optimized.gif': 'test/fixtures/test-optimized.gif'
        }
      }
    },
    nodeunit: {
      tests: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('mkdir', grunt.file.mkdir);

  grunt.registerTask('test', [
    'clean',
    'mkdir:tmp',
    'imagemin',
    'nodeunit',
    'clean'
  ]);

  grunt.registerTask('default', ['test', 'build-contrib']);
};
