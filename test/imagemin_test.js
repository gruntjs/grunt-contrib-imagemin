'use strict';
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var os = require('os');

var cacheDirectory = (os.tmpdir || function() {
    if (process.platform === 'win32') {
        return process.env.TEMP || process.env.TMP || (process.env.SystemRoot || process.env.windir) + '\\temp';
    } else {
        return process.env.TMPDIR || process.env.TMP || process.env.TEMP || '/tmp';
    }
})();
cacheDirectory = path.join(cacheDirectory, 'grunt-contrib-imagemin.cache');

exports.imagemin = {
    cacheJpg: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.jpg')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached JPG images');

        test.done();
    },

    cachePng: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.png')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached PNG images');

        test.done();
    }
};
