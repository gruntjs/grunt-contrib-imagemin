# grunt-contrib-imagemin [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-imagemin.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-imagemin)

> Minify PNG and JPEG images


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-imagemin --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Imagemin task
_Run this task with the `grunt imagemin` command._

Minify images using [OptiPNG](http://optipng.sourceforge.net) and [jpegtran](http://jpegclub.org/jpegtran/).


### Options

#### optimizationLevel *(png only)*

Type: `Number`  
Default: `0`

Select optimization level between `0` and `7`.

> The optimization level 0 enables a set of optimization operations that require minimal effort. There will be no changes to image attributes like bit depth or color type, and no recompression of existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial chosen is what. OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher enable multiple IDAT compression trials; the higher the level, the more trials.

Level and trials:

1. 1 trial
2. 8 trials
3. 16 trials
4. 24 trials
5. 48 trials
6. 120 trials
7. 240 trials


#### progressive *(jpg only)*

Type: `Boolean`  
Default: `false`

Lossless conversion to progressive.

#### Example config

```javascript
grunt.initConfig({
  imagemin: {                          // Task
    dist: {                            // Target
      options: {                       // Target options
        optimizationLevel: 3
      },
      files: {                         // Dictionary of files
        'dist/img.png': 'src/img.png', // 'destination': 'source'
        'dist/img.jpg': 'src/img.jpg'
      }
    },
    dev: {                             // Another target
      options: {                       // Target options
        optimizationLevel: 0
      },
      files: {
        'dev/img.png': 'src/img.png',
        'dev/img.jpg': 'src/img.jpg'
      }
    }
  }
});

grunt.registerTask('default', ['imagemin']);
```


## Release History

 * 2013-01-10   v0.1.1rc7   Updating to work with grunt v0.4.0rc7. Switching to this.files api.
 * 2012-11-01   v0.1.0   Initial release.

---

Task submitted by [Sindre Sorhus](http://github.com/sindresorhus)

*This file was generated on Tue Jan 29 2013 16:04:54.*
