'use strict';
var chalk = require('chalk');
// Has dependencies on ImageMagick
var im = require('imagemagick');

exports.imagemin = {
    interlacedJpg: function (test) {
        test.expect(1);

        im.identify(['-verbose', 'tmp/test.jpg'], function (err, features) {
            if (err) {
				test.ok(false, err + chalk.red('Make sure ImageMagick CLI tools are installed'));
            }
			else {
				var interlaceValue = features.match(/Interlace: \w+/)[0].split(' ')[1];
				test.strictEqual(interlaceValue, 'JPEG', 'should be progressive JPG images');
			}

			test.done();
		});
    }
};
