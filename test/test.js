'use strict';
var fs = require('fs');
var os = require('os');
var path = require('path');
var crypto = require('crypto');
var grunt = require('grunt');
var tmpdir = os.tmpdir ? os.tmpdir() : os.tmpDir();
var cacheDir = path.join(tmpdir, 'grunt-contrib-imagemin.cache');

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
    minifyOptimizedPng: function (test) {
        test.expect(1);

        var actual = crypto.createHash('sha1').update(grunt.file.read('tmp/test-optimized.png')).digest('hex');
        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test-optimized.png')).digest('hex');
        test.ok(actual === original, 'should not change previously optimized images');

        test.done();
    },
    cachePng: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.png')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDir, original)), 'should cached PNG images');

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
    minifyOptimizedJpg: function (test) {
        test.expect(1);

        var actual = crypto.createHash('sha1').update(grunt.file.read('tmp/test-optimized.jpg')).digest('hex');
        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test-optimized.jpg')).digest('hex');
        test.ok(actual === original, 'should not change previously optimized images');

        test.done();
    },
    cacheJpg: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.jpg')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDir, original)), 'should cached JPG images');

        test.done();
    },
    minifyGif: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test.gif').size;
        var original = fs.statSync('test/fixtures/test.gif').size;
        test.ok(actual < original, 'should minify GIF images');

        test.done();
    },
    minifyUppercaseGif: function (test) {
        test.expect(1);

        var actual = fs.statSync('tmp/test-uppercase.GIF').size;
        var original = fs.statSync('test/fixtures/test-uppercase.GIF').size;
        test.ok(actual < original, 'should minify uppercase extension GIF images');

        test.done();
    },
    minifyOptimizedGif: function (test) {
        test.expect(1);

        var actual = crypto.createHash('sha1').update(grunt.file.read('tmp/test-optimized.gif')).digest('hex');
        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test-optimized.gif')).digest('hex');
        test.ok(actual === original, 'should not change previously optimized images');

        test.done();
    },
    cacheGif: function (test) {
        test.expect(1);

        var original = crypto.createHash('sha1').update(grunt.file.read('test/fixtures/test.gif')).digest('hex');
        test.ok(fs.existsSync(path.join(cacheDir, original)), 'should cached GIF images');

        test.done();
    }
};
