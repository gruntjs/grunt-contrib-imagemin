'use strict';
var os = require('os');
var async = require('async');
var chalk = require('chalk');
var filesize = require('filesize');
var imagemin = require('image-min');

/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    grunt.registerMultiTask('imagemin', 'Minify PNG, JPEG and GIF images', function () {
        var done = this.async();
        var self = this;
        var totalSaved = 0;
        var options = this.options({
            cache: true,
            optimizationLevel: 7,
            progressive: true
        });

        async.forEachLimit(this.files, os.cpus().length, function (file, next) {
            imagemin(file.src[0], file.dest, options, function (err, data) {
                var msg;

                if (err) {
                    grunt.warn(err);
                }

                totalSaved += data.diffSizeRaw;

                if (data.diffSizeRaw < 10) {
                    msg = 'already optimized';
                } else {
                    msg = 'saved ' + data.diffSize;
                }

                grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));
                process.nextTick(next);
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
