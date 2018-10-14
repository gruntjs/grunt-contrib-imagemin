const os = require('os');
const chalk = require('chalk');
const imagemin = require('imagemin');
const plur = require('plur');
const prettyBytes = require('pretty-bytes');
const pMap = require('p-map');

const defaultPlugins = ['gifsicle', 'jpegtran', 'optipng', 'svgo'];

const loadPlugin = (grunt, plugin, opts) => {
	try {
		return require(`imagemin-${plugin}`)(opts);
	} catch (error) {
		grunt.warn(`Couldn't load default plugin "${plugin}"`);
	}
};

const getDefaultPlugins = (grunt, opts) => defaultPlugins.reduce((plugins, plugin) => {
	const instance = loadPlugin(grunt, plugin, opts);

	if (!instance) {
		return plugins;
	}

	return plugins.concat(instance);
}, []);

module.exports = grunt => {
	grunt.registerMultiTask('imagemin', 'Minify PNG, JPEG, GIF and SVG images', function () {
		const done = this.async();
		const options = this.options({
			interlaced: true,
			optimizationLevel: 3,
			progressive: true,
			concurrency: os.cpus().length
		});

		if (Array.isArray(options.svgoPlugins)) {
			options.plugins = options.svgoPlugins;
		}

		const plugins = options.use || getDefaultPlugins(grunt, options);

		let totalBytes = 0;
		let totalSavedBytes = 0;
		let totalFiles = 0;

		const processFile = file => Promise.resolve(grunt.file.read(file.src[0], {encoding: null}))
			.then(buf => Promise.all([imagemin.buffer(buf, {plugins}), buf]))
			.then(res => {
				// TODO: Use destructuring when targeting Node.js 6
				const optimizedBuf = res[0];
				const originalBuf = res[1];
				const originalSize = originalBuf.length;
				const optimizedSize = optimizedBuf.length;
				const saved = originalSize - optimizedSize;
				const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;
				const savedMsg = `saved ${prettyBytes(saved)} - ${percent.toFixed(1).replace(/\.0$/, '')}%`;
				const msg = saved > 0 ? savedMsg : 'already optimized';

				if (saved > 0) {
					totalBytes += originalSize;
					totalSavedBytes += saved;
					totalFiles++;
				}

				grunt.file.write(file.dest, optimizedBuf);
				grunt.verbose.writeln(chalk.green('✔ ') + file.src[0] + chalk.gray(` (${msg})`));
			})
			.catch(error => {
				grunt.warn(`${error} in file ${file.src[0]}`);
			});

		pMap(this.files, processFile, {concurrency: options.concurrency}).then(() => {
			const percent = totalBytes > 0 ? (totalSavedBytes / totalBytes) * 100 : 0;
			let msg = `Minified ${totalFiles} ${plur('image', totalFiles)}`;

			if (totalFiles > 0) {
				msg += chalk.gray(` (saved ${prettyBytes(totalSavedBytes)} - ${percent.toFixed(1).replace(/\.0$/, '')}%)`);
			}

			grunt.log.writeln(msg);
			done();
		});
	});
};
