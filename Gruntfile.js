/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Sindre Sorhus, contributors
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
          'tmp/test-uppercase.GIF': 'test/fixtures/test-uppercase.GIF'
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


  // event driven logging demonstration
  var loggerFactory = __dirname+"/lib/ProgressBarLogger.js";
  var inst;
  var item_done;
  var job_done;

  var grunt_muter = function(fn){
    return function(){
      // to really mute grunt
      grunt.log.muted = false;
      fn.apply(inst,arguments);
      grunt.log.muted = true;
      return true;
    }
  }

  grunt.registerTask('install', function(){
    var Logger  = require(loggerFactory)(grunt);
    inst = new Logger();
    item_done = grunt_muter(inst.item_done);
    job_done = grunt_muter(inst.job_done);
    grunt.event.once("grunt_contribimgmin_init", grunt_muter(inst.init));
    grunt.event.on("grunt_contribimgmin_item_done", item_done);
    grunt.event.on("grunt_contribimgmin_job_done", job_done);
    grunt.log.muted = true;
  });
  grunt.registerTask('remove', function(){
    grunt.log.muted = false;
    grunt.event.off("grunt_contribimgmin_item_done", item_done);
    grunt.event.off("grunt_contribimgmin_job_done", job_done);
    item_done = null;
    job_done = null;
    inst = null;
  });
  grunt.registerTask('imgmin_task', ['install', 'imagemin', 'remove']);



};
