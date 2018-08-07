'use strict';

import path from 'path';
import makeWebpackConfig from './webpack.make';
import webpack from 'webpack-stream';
import nodemon from 'nodemon';
import http from 'http';
import fs from 'fs-extra';

export default (gulp, plugins, config) => {
	gulp.task('start:server', (cb) => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    //config = require(`./${config.serverPath}/config/environment`);
    nodemon({ script: config.serverPath, ext: 'js json', ignore: [ config.clientPath+'/*' ] })
				.on('log', onServerLog);
				
		whenServerReady(cb);
	});

	gulp.task('start:server:prod', () => {
			process.env.NODE_ENV = process.env.NODE_ENV || 'production';
			//config = require(`./${paths.dist}/${config.serverPath}/config/environment`);
			nodemon(`-w ${paths.dist}/${config.serverPath} ${paths.dist}/${config.serverPath}`)
					.on('log', onServerLog);
	});

	gulp.task('start:server:debug', () => {
			process.env.NODE_ENV = process.env.NODE_ENV || 'development';
			//onfig = require(`./${config.serverPath}/config/environment`);
			// nodemon(`-w ${config.serverPath} --debug=5858 --debug-brk ${config.serverPath}`)
			nodemon(`-w ${config.serverPath} --debug=5858 --debug-brk ${config.serverPath}`)
					.on('log', onServerLog);
	});

	
	gulp.task('server:copy', () => {
		gulp.src(path.join(config.root, '/client/assets/**/*.*'))
				.pipe(gulp.dest('./dist/client/assets/'));
		
		gulp.src(path.join(config.root, '/client/favicon.ico'))
				.pipe(gulp.dest('./dist/client/'));

		gulp.src(path.join(config.root, '/*.json'))
				.pipe(gulp.dest('./dist/'));
	});
	
	gulp.task('server:generate:index', (cb) => {
		let content = [
			`'use strict';`,
			`process.env.NODE_ENV = 'production';`,
			`process.env.PORT = 9000;`,
			`require('./server/index.js');`
		].join('\n');

		fs.mkdirpSync(path.join(config.root, '/dist/'));

		fs.writeFile(path.join(config.root, '/dist/index.js'), content, cb);
	});

	gulp.task('server:babel', () => {
		return gulp.src(config.root + '/server/**/*.js')
								.pipe(plugins.babel({
									presets: ['env'],
									plugins: [
										'transform-class-properties'
									]
								}))
								.pipe(gulp.dest(config.root + '/dist/server/'));
	});

	gulp.task('server:offline:css', () => {

		// make auto
		let cdnCss = [
			'http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css',
			'http://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.9.0/loading-bar.min.css',
			'http://cdn.quilljs.com/1.3.5/quill.snow.css',
			'http://cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.css',
		];

		plugins.download(cdnCss)
			.pipe(gulp.dest(config.root + '/dist/client/assets/styles/'));
		
		gulp.src(path.join(config.root, '/node_modules/font-awesome/fonts/*.*'))
				.pipe(gulp.dest('./dist/client/assets/fonts/'));
		
		gulp.src(path.join(config.root, '/node_modules/font-awesome/css/font-awesome.min.css'))
			.pipe(gulp.dest('./dist/client/assets/styles/'));

	});
	

	gulp.task('server:dist', ['server:babel', 'server:generate:index', 'server:copy']);

	gulp.task('server:dist:offline', ['server:babel', 'server:generate:index', 'server:offline:css', 'server:copy']);

	function checkAppReady(cb) {
		var options = {
				host: 'localhost',
				port: config.port
		};
		http
				.get(options, () => cb(true))
				.on('error', () => cb(false));
	}
	
	// Call page until first success
	function whenServerReady(cb) {
		var serverReady = false;
		var appReadyInterval = setInterval(() =>
				checkAppReady((ready) => {
						if (!ready || serverReady) {
								return;
						}
						clearInterval(appReadyInterval);
						serverReady = true;
						cb();
				}),
				100);
	}
	
	function onServerLog(log) {
		console.log(plugins.util.colors.white('[') +
				plugins.util.colors.yellow('nodemon') +
				plugins.util.colors.white('] ') +
				log.message);
	}
}
