import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';

import tasksFactory from './tasks';

let plugins = gulpLoadPlugins();

let util = plugins.util;

let config = {
	port: 3000,
	root: __dirname,
	clientPath: 'client',
	serverPath: 'server',
	dist: 'dist'
};

tasksFactory(gulp, plugins, config);

gulp.task('serve', cb => {
	runSequence(
			[
					'clean:tmp', 'inject'
			],
			'webpack:dev',
			'start:server',
			'watch',
			cb
	);
});

gulp.task('serve:debug', cb => {
	runSequence(
			[
					'clean:tmp', 'inject'
			],
			'webpack:dev',
			['start:server:debug'],
			'watch',
			cb
	);
});

gulp.task('clean:tmp', () => del(['.tmp/**/*'], {dot: true}));

gulp.task('watch', (cb) => {
	gulp.watch('./tmp/**,*', (cb) => {
		plugins.util('are some changes on ./tmp');
	});
});