'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var filesize = require('filesize');
var imagemin = require('image-min');

/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

function mkdir_p(dir, callback, position)
{
    position = position || 0;
    var parts = path.normalize(dir).split('/');
 
    if (position >= parts.length) {
        if (callback) {
            return callback();
        } else {
            return true;
        }
    }
 
    var directory = parts.slice(0, position + 1).join('/');
    fs.stat(directory, function(err) {
        if (err === null) {
            mkdir_p(dir, callback, position + 1);
        } else {
            fs.mkdir(directory, function (err) {
                // if (err) {
                //     if (callback) {
                //         return callback(err);
                //     } else {
                //         throw err;
                //     }
                // } else {
                    mkdir_p(dir, callback, position + 1);
                // }
            })
        }
    })
}

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
            options.ext = path.extname(file.src[0]);
            var dir = path.dirname(file.dest);

            if (!options.ext)
            {
                return next();
            }

            var run = function () {
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

            fs.stat(dir, function (err, stats) {
                
                if (err || !stats.isDirectory())
                {
                    mkdir_p(dir, function (err) {
                        if (err)
                        {
                            return grunt.warn(err);
                        }

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