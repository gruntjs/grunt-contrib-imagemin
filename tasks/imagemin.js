'use strict';
var os = require('os');
var async = require('async');
var chalk = require('chalk');
var filesize = require('filesize');
var imagemin = require('image-min');
var progress = require('progress');

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
        var options = this.options({
            cache: true,
            outputFormat: 'text',
            barFormat: '  minified=[:current/:total] elapsed=[:elapseds] sprint=[:percent] eta=[:etas] [:bar]',
            optimizationLevel: 7,
            progressive: true
        });

        var logger = new TextLogger();
        if( options.outputFormat === "progress" ){
          logger = new ProgressLogger();
        }

        logger.init( this.files.length );

        async.forEachLimit(this.files, os.cpus().length, function (file, next) {
            imagemin(file.src[0], file.dest, options, function (err, data) {
                if (err) {
                    grunt.warn(err);
                }
                logger.image_done(file.src[0],data);
                process.nextTick(next);
            });
        }, function (err) {
            if (err) {
                grunt.warn(err);
            }
            logger.limit_done();
            done();
        });
    });


    function TextLogger(){
        var that = this;
        that.filesCount = 0;
        that.totalSaved = 0;

        that.image_done = function(src,data){
            that.totalSaved += data.diffSizeRaw;

            var msg = 'already optimized';
            if (data.diffSizeRaw > 10) {
                msg = 'saved ' + data.diffSize;
            }

            grunt.log.writeln(chalk.green('✔ ') + src + chalk.gray(' (' + msg + ')'));
        };

        that.limit_done = function(){
            var msg  = 'Minified ' + that.filesCount + ' ';
            msg += that.filesCount === 1 ? 'image' : 'images';
            msg += chalk.gray(' (saved ' + filesize(that.totalSaved) + ')');

            grunt.log.writeln(msg);
        };

        that.init = that.reset = function(files_count){
            that.filesCount = files_count;
            that.totalSaved = 0;
        };
    }

    function ProgressLogger(){
        var that = this;
        that.filesCount = 0;
        that.totalSaved = 0;
        that.bar = null;

        that.image_done = function(src,data){
            that.totalSaved += data.diffSizeRaw;
            that.bar.tick();
        };

        that.limit_done = function(){
            var msg = chalk.gray(' (saved ' + filesize(that.totalSaved) + ')');
            grunt.log.writeln(msg);
        };

        that.init = that.reset = function(files_count){
            that.filesCount = files_count;
            that.totalSaved = 0;
            that.bar  = new progress('  minified=[:current/:total] elapsed=[:elapseds] sprint=[:percent] eta=[:etas] [:bar]', {
                complete: '=',
                incomplete: ' ',
                width: 40,
                total: that.filesCount
            });
        };
    }

};
