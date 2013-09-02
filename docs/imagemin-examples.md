## Example config

You can either map your files statically or [dynamically](https://github.com/gruntjs/grunt/wiki/Configuring-tasks#building-the-files-object-dynamically).

```javascript
grunt.initConfig({
  imagemin: {                          // Task
    static: {                          // Target
      options: {                       // Target options
        optimizationLevel: 3
      },
      files: {                         // Dictionary of files
        'dist/img.png': 'src/img.png', // 'destination': 'source'
        'dist/img.jpg': 'src/img.jpg',
        'dist/img.gif': 'src/img.gif'
      }
    },
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'src/',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}']    // Actual patterns to match
        dest: 'dist/'                  // Destination path prefix
      }]
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.registerTask('default', ['imagemin']);
```
