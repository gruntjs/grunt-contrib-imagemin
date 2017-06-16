'use strict';
module.exports = grunt => {
	grunt.initConfig({
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'test/fixtures',
					src: '**/*.{gif,GIF,jpg,JPG,png,PNG}',
					dest: 'tmp'
				}]
			},
			rename: {
				files: {
					'tmp/rename.jpg': 'test/fixtures/test.jpg'
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.registerTask('default', ['imagemin']);
};
