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
        var optipngArgs = ['-strip', 'all'];
        var jpegtranArgs = ['-copy', 'none', '-optimize'];

        if (typeof options.optimizationLevel === 'number') {
            optipngArgs.push('-o', options.optimizationLevel);
        }

        if (options.progressive === true) {
            jpegtranArgs.push('-progressive');
        }

        grunt.verbose.writeflags(options, 'Options');

        grunt.util.async.forEachLimit(this.files, 30, function (file, next) {
            optimize(file.src[0], file.dest, next);
        }.bind(this), this.async());

        function optimize(src, dest, next) {
            var cp;
            var originalSize = fs.statSync(src).size;

            function processed(err, result, code) {
                var saved, savedMsg;

                if (err) {
                    grunt.log.writeln(err);
                }

                saved = originalSize - fs.statSync(dest).size;

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
                // OptiPNG can't overwrite without creating a backup file
                // https://sourceforge.net/tracker/?func=detail&aid=3607244&group_id=151404&atid=780913
                if (dest !== src && grunt.file.exists(dest)) {
                    grunt.file.delete(dest);
                }

                cp = grunt.util.spawn({
                    cmd: optipngPath,
                    args: optipngArgs.concat(['-out', dest, src])
                }, processed);
            } else if (['.jpg', '.jpeg'].indexOf(path.extname(src)) !== -1) {
                cp = grunt.util.spawn({
                    cmd: jpegtranPath,
                    args: jpegtranArgs.concat(['-outfile', dest, src])
                }, processed);
            } else {
                next();
            }

            if (cp && grunt.option('verbose')) {
                cp.stdout.pipe(process.stdout);
                cp.stderr.pipe(process.stderr);
            }
        }
    });
};
