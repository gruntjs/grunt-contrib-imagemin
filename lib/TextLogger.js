'use strict';
var chalk = require('chalk');
var filesize = require('filesize');

/*
 * grunt-contrib-imagemin
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    function TextLogger(){
        this.filesCount = 0;
        this.totalSaved = 0;
    }

    TextLogger.prototype.item_done = function(filesCount, file, err, data){
        this.totalSaved += data.diffSizeRaw;

        var msg = 'already optimized';
        if (data.diffSizeRaw > 10) {
            msg = 'saved ' + data.diffSize;
        }

        grunt.log.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(' (' + msg + ')'));
    };

    TextLogger.prototype.job_done = function(filesCount, err){
        var msg  = 'Minified ' + this.filesCount + ' ';
        msg += this.filesCount === 1 ? 'image' : 'images';
        msg += chalk.gray(' (saved ' + filesize(this.totalSaved) + ')');

        grunt.log.writeln(msg);
    };

    TextLogger.prototype.reset = TextLogger.prototype.init = function(filesCount){
        this.filesCount = filesCount;
        this.totalSaved = 0;
    };

    return TextLogger;
};
