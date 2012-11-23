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
  var async = grunt.util.async;
  var filesize = require('filesize');

  grunt.registerMultiTask('imagemin', 'Minify PNG and JPEG images', function() {
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options();
    var cb = this.async();
    var optipngPath = require('optipng').path;
    var jpegtranPath = require('jpegtran').path;
    var optipngArgs = ['-strip', 'all', '-clobber'];
    var jpegtranArgs = ['-copy', 'none', '-optimize'];
    var totalSaved = 0;

    grunt.verbose.writeflags(options, 'Options');

    if (typeof options.optimizationLevel === 'number') {
      optipngArgs.push('-o', options.optimizationLevel);
    }

    if (typeof options.progressive === 'number') {
      jpegtranArgs.push('-progressive');
    }

    async.forEach(this.files, function(el, cb2) {
      var src = el.src[0];
      var dest = el.dest;

      function processed(err, stdout, stderr) {
        if (err) {
          grunt.warn(err);
        }
        var saved = fs.statSync(src).size - fs.statSync(dest).size;
        totalSaved += saved;
        grunt.log.writeln('✔ '.green + src + (' (saved ' + filesize(saved) + ')').grey);
        cb2();
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
        cb2();
      }
    }, function(err) {
      if (err) {
        grunt.warn(err);
      }
      grunt.log.subhead('Total saved: ' + filesize(totalSaved));
      cb();
    });
  });
};
