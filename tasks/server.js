'use strict';

import path from 'path';
import makeWebpackConfig from './webpack.make';
import webpack from 'webpack-stream';
import nodemon from 'nodemon';
import http from 'http';

export default (gulp, plugins, config) => {
	gulp.task('start:server', (cb) => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    //config = require(`./${config.serverPath}/config/environment`);
    nodemon({ script: config.serverPath, ext: 'js json' })
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
