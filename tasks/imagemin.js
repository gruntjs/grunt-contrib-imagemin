/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var fs = require('fs');
  var childProcess = require('child_process');
  var filesize = require('filesize');
  var optipngPath = require('optipng-bin').path;
  var jpegtranPath = require('jpegtran-bin').path;
  var optipngArgs = ['-strip', 'all', '-clobber'];
  var jpegtranArgs = ['-copy', 'none', '-optimize'];

  grunt.registerMultiTask('imagemin', 'Minify PNG and JPEG images', function() {
    var options = this.options();
    var cb = this.async();
    var src = this.file.src[0];
    var dest = this.file.dest;

    grunt.verbose.writeflags(options, 'Options');

    // Create the dest dir, since these tools can't handle it
    grunt.file.mkdir(path.dirname(dest));

    if (typeof options.optimizationLevel === 'number') {
      optipngArgs.push('-o', options.optimizationLevel);
    }

    if (typeof options.progressive === 'number') {
      jpegtranArgs.push('-progressive');
    }

    function processed(err, result, code) {
      var saved, savedMsg;

      if (err) {
        grunt.warn(err);
      }

      saved = fs.statSync(src).size - fs.statSync(dest).size;

      if (result.stderr.indexOf('already optimized') !== -1 || saved < 10) {
        savedMsg = 'already optimized';
      } else {
        savedMsg = 'saved ' + filesize(saved);
      }

      grunt.log.writeln('✔ '.green + src + (' (' + savedMsg + ')').grey);
      cb();
    }

    if (path.extname(src) === '.png') {
      grunt.util.spawn({
        cmd: optipngPath,
        args: optipngArgs.concat(['-out', dest, src])
      }, processed);
    } else if (['.jpg', '.jpeg'].indexOf(path.extname(src)) !== -1) {
      grunt.util.spawn({
        cmd: jpegtranPath,
        args: jpegtranArgs.concat(['-outfile', dest, src]),
      }, processed);
    } else {
      cb();
    }
  });
};
