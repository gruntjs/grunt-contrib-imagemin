/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

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
      tmp: ['tmp'],
      chunk: ['test/fixtures/chunk']
    },
    imagemin: {
      dist: {
        files: [
          { src: ['**/*'], dest: 'tmp/', expand: true, cwd: 'test/fixtures/' }
        ]
      }
    },
    nodeunit: {
      tests: ['test/test.js'],
      chunk: ['test/chunk.js']
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
    'mkdir:test/fixtures/chunk',
    'nodeunit:chunk',
    'imagemin',
    'nodeunit:tests',
    'clean'
  ]);

  grunt.registerTask('default', ['test', 'build-contrib']);

  grunt.registerTask('chunk', ['clean:chunk', 'mkdir:test/fixtures/chunk', 'nodeunit:chunk']);
};
