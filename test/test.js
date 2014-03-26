'use strict';
var fs = require('fs');
var grunt = require('grunt');
var os = require('os');
var path = require('path');

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
    nestedDirs: function (test) {
        test.expect(1);

        test.ok(fs.existsSync('tmp/nested/nested/test.png'), 'should support nested dest dir');

        test.done();
    }
};
