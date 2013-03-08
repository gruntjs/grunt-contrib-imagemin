'use strict';
var grunt = require('grunt');
var fs = require('fs');

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
    }
};
