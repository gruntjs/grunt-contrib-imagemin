'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var async = require('async');
var chalk = require('chalk');
var prettyBytes = require('pretty-bytes');
var mkdirp = require('mkdirp');
var imagemin = require('image-min');

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
        var files = this.files;
        var totalSaved = 0;
        var options = this.options({
            optimizationLevel: 7,
            progressive: true
        });

        async.forEachLimit(files, os.cpus().length, function (file, next) {
            var msg;
            options.ext = path.extname(file.src[0]);

            // filter out dirs
            if (!options.ext) {
                return next();
            }

            mkdirp.sync(path.dirname(file.dest));

            fs.createReadStream(file.src[0])
                .pipe(imagemin(options)
                    .on('error', grunt.warn.bind(grunt))
                    .on('close', function (data) {
                        totalSaved += data.diffSizeRaw;

                        if (data.diffSizeRaw < 10) {
                            msg = 'already optimized';
                        } else {
                            msg = 'saved ' + data.diffSize + ' - ' + (data.diffSizeRaw / data.origSizeRaw * 100).toFixed() + '%';
                        }
                    }))
                .pipe(fs.createWriteStream(file.dest)
                    .on('error', grunt.warn.bind(grunt))
                    .on('close', function () {
                        grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));
                        process.nextTick(next);
                    }));
        }, function (err) {
            if (err) {
                grunt.warn(err);
            }

            var msg  = 'Minified ' + files.length + ' ';
                msg += files.length === 1 ? 'image' : 'images';
                msg += chalk.gray(' (saved ' + prettyBytes(totalSaved) + ')');

            grunt.log.writeln(msg);
            done();
        });
    });
};
