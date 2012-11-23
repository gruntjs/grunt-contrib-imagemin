# grunt-contrib-imagemin [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-imagemin.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-imagemin)

> Minify PNG and JPEG images

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-imagemin --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-imagemin');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The imagemin task

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
        'dist/img.png': 'src/img.png'  // 'destination': 'source'
        'dist/img.jpg': 'src/img.jpg'
      }
    },
    dev: {                             // Another target
      options: {                       // Target options
        optimizationLevel: 0
      },
      files: {
        'dev/img.png': 'src/img.png'
        'dev/img.jpg': 'src/img.jpg'
      }
    }
  }
});

grunt.registerTask('default', ['imagemin']);
```


## Release History

 * 2012-11-01 - v0.1.0 - Initial release.

--
Task submitted by <a href="http://github.com/sindresorhus">Sindre Sorhus</a>.

*Generated on Fri Nov 23 2012 21:03:55.*
