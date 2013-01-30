/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var path = require('path');
    var fs = require('fs');
    var childProcess = require('child_process');
    var filesize = require('filesize');
    var optipngPath = require('optipng-bin').path;
    var jpegtranPath = require('jpegtran-bin').path;

    grunt.registerMultiTask('imagemin', 'Minify PNG and JPEG images', function () {
        var options = this.options();

        var optipngArgs = ['-strip', 'all', '-clobber'];
        var jpegtranArgs = ['-copy', 'none', '-optimize'];

        if (typeof options.optimizationLevel === 'number') {
            optipngArgs.push('-o', options.optimizationLevel);
        }

        if (typeof options.progressive === 'number') {
            jpegtranArgs.push('-progressive');
        }

        grunt.verbose.writeflags(options, 'Options');

        grunt.util.async.forEach(this.files, function (files, next) {
            files.src.forEach(function (src) {
                var dest = files.dest;
                if (path.extname(dest) === '') {
                    dest = path.join(dest, path.basename(src));
                }
                optimize(src, dest, next);
            });
        }.bind(this), this.async());


        function optimize(src, dest, next) {
            function processed(err, result, code) {
                var saved, savedMsg;

                if (err) {
                    grunt.log.writeln(err);
                }

                saved = fs.statSync(src).size - fs.statSync(dest).size;

                if (result.stderr.indexOf('already optimized') !== -1 || saved < 10) {
                    savedMsg = 'already optimized';
                } else {
                    savedMsg = 'saved ' + filesize(saved);
                }

                grunt.log.writeln('✔ '.green + src + (' (' + savedMsg + ')').grey);
                next();
            }

            grunt.file.mkdir(path.dirname(dest));

            if (path.extname(src) === '.png') {
                grunt.util.spawn({
                    cmd: optipngPath,
                    args: optipngArgs.concat(['-out', dest, src])
                }, processed);
            } else if (['.jpg', '.jpeg'].indexOf(path.extname(src)) !== -1) {
                grunt.util.spawn({
                    cmd: jpegtranPath,
                    args: jpegtranArgs.concat(['-outfile', dest, src])
                }, processed);
            } else {
                next();
            }
        }
    });
};
