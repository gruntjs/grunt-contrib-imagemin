'use strict';

var cache = require('cache-file');
var fs = require('fs');
var grunt = require('grunt');
var os = require('os');
var path = require('path');

function copyFile(source, target, cb)
{
    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
      done(err);
    })
    .pipe(fs.createWriteStream(target)
        .on("error", function(err) {
          done(err);
        })
        .on("close", function(ex) {
          done();
        })
    );

    function done(err)
    {
        if (cb)
        {
            cb(err);
            cb = null;
        }
    }
}

exports.imagemin = {
    createChunk: function (test)
    {
        test.expect(1);

        var max = 150;

        function createImage(index, callback)
        {
            if (index > max)
            {
                return callback();
            }

            copyFile('test/fixtures/chunk.png', 'test/fixtures/chunk/' + index + '.png', function (err) {
                if (err)
                {
                    test.ok(false, 'should create image ' + index);
                    return test.done();
                }

                createImage(index + 1, callback);
            })
        }

        createImage(1, function () {
            test.ok(true, 'should create chunk');
            test.done();
        });
    }
};
