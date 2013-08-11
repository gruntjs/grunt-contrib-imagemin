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
    minifyPng: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test.png').size;
        var original = fs.statSync('test/fixtures/test.png').size;
        test.ok(actual < original, 'should minify PNG images');

        test.done();
    },
    minifyUppercasePng: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test-uppercase.PNG').size;
        var original = fs.statSync('test/fixtures/test-uppercase.PNG').size;
        test.ok(actual < original, 'should minify uppercase extension PNG images');

        test.done();
    },
    cachePng: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.png')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached PNG images');

        test.done();
    },
    minifyJpg: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test.jpg').size;
        var original = fs.statSync('test/fixtures/test.jpg').size;
        test.ok(actual < original, 'should minify JPG images');

        test.done();
    },
    minifyUppercaseJpg: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test-uppercase.JPG').size;
        var original = fs.statSync('test/fixtures/test-uppercase.JPG').size;
        test.ok(actual < original, 'should minify uppercase extension JPG images');

        test.done();
    },
    cacheJpg: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.jpg')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached JPG images');

        test.done();
    }
};
