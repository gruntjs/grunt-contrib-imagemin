'use strict';
var chalk = require('chalk');
var filesize = require('filesize');
var progress = require('progress');

/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    function ProgressLogger(){
        this.filesCount = 0;
        this.totalSaved = 0;
        this.bar = 0;
    }

    ProgressLogger.prototype.item_done = function(filesCount, file, err, data){
        this.totalSaved += data.diffSizeRaw;
        this.bar.tick();
    };

    ProgressLogger.prototype.job_done = function(filesCount, err){
        var msg = chalk.gray(' (saved ' + filesize(this.totalSaved) + ')');
        grunt.log.writeln(msg);
    };

    ProgressLogger.prototype.reset = ProgressLogger.prototype.init = function(filesCount,pattern){
        if(!pattern)
            pattern = "  minified=[:current/:total] elapsed=[:elapseds] sprint=[:percent] eta=[:etas] [:bar]";
        this.filesCount = filesCount;
        this.totalSaved = 0;
        this.bar  = new progress(pattern, {
            complete: '=',
            incomplete: ' ',
            width: 40,
            total: this.filesCount
        });
    };


    return ProgressLogger;
};
