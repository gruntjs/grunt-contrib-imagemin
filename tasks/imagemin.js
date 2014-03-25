'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var filesize = require('filesize');
var imagemin = require('image-min');
var mkdirp = require('mkdirp');

/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    grunt.registerMultiTask('imagemin', 'Minify PNG, JPEG and GIF images', function () {
        var done = this.async();
        var msg;
        var self = this;
        var totalSaved = 0;
        var options = this.options({
            optimizationLevel: 7,
            progressive: true
        });

        async.forEachLimit(this.files, os.cpus().length, function (file, next) {
            if (!file.src[0])
            {
                return next();
            }

            var ext = path.extname(file.src[0]);

            var run = function () {
                if (!ext)
                {
                    return next();
                }

                options.ext = ext;

                fs.createReadStream(file.src[0])
                .pipe(imagemin(options)
                    .on('error', function (err) {
                        grunt.warn(err);
                    })
                    .on('close', function (data) {
                        totalSaved += data.diffSizeRaw;

                        if (data.diffSizeRaw < 10) {
                            msg = 'already optimized';
                        } else {
                            msg = 'saved ' + data.diffSize + ' - ' + (data.diffSizeRaw / data.origSizeRaw * 100).toFixed() + '%';
                        }
                    }))
                .pipe(fs.createWriteStream(file.dest)
                    .on('error', function (err) {
                        grunt.warn(err);
                    })
                    .on('close', function () {
                        grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));
                        next();
                    }));
            };

            var dir = file.dest;
            if (ext)
            {
                dir = path.dirname(file.dest);
            }

            fs.stat(dir, function (err, stat) {
                if (err)
                {
                    mkdirp(dir, function (err) {
                        run();
                    });
                }
                else
                {
                    run();
                }
            });
        }, function (err) {
            if (err) {
                grunt.warn(err);
            }

            var msg  = 'Minified ' + self.files.length + ' ';
                msg += self.files.length === 1 ? 'image' : 'images';
                msg += chalk.gray(' (saved ' + filesize(totalSaved) + ')');

            grunt.log.writeln(msg);
            done();
        });
    });
};
