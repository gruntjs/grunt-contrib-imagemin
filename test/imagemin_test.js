'use strict';
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var os = require('os');

exports.imagemin = {
    minifyPng: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test.png').size;
        var original = fs.statSync('test/fixtures/test.png').size;
        test.ok(actual < original, 'should minify PNG images');

        test.done();
    },
    minifyJpg: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test.jpg').size;
        var original = fs.statSync('test/fixtures/test.jpg').size;
        test.ok(actual < original, 'should minify JPG images');

        test.done();
    },
    cacheJpg: function (test) {
        test.expect(1);

        var cacheDirectory = grunt.config('imagemin.dist.options.cache');
        if (cacheDirectory === true) {
            cacheDirectory = os.tmpdir();
        }

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.jpg')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached JPG images');

        test.done();
    },
    cachePng: function (test) {
        test.expect(1);

        var cacheDirectory = grunt.config('imagemin.dist.options.cache');
        if (cacheDirectory === true) {
            cacheDirectory = os.tmpdir();
        }

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.png')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDirectory, original)), 'should cached PNG images');

        test.done();
    }
};
