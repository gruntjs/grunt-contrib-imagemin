/*
 * grunt-contrib-htmlmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('imagemin', 'Minify PNG and JPEG images', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options();

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(el) {
      
    });
  });
};
