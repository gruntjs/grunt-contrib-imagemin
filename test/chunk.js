'use strict';

var cache = require('cache-file');
var fs = require('fs');
var grunt = require('grunt');
var os = require('os');
var path = require('path');

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
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
