'use strict';

import path from 'path';
import runSequence from 'run-sequence';

export default (gulp, plugins, config) => {
	let clientModules = [
		path.join(config.root, 'templates/client/route')
	];

	let serverModules = [
		path.join(config.root, 'templates/server/api')
	];
	
	task_('codebot:app', 'templates/app.model.json', clientModules, 'client/');
	task_('codebot:curador', 'templates/curador.model.json', clientModules, 'client/');
	task_('codebot:social', 'templates/social.model.json', clientModules, 'client/');
	task_('codebot:server', 'templates/server.model.json', serverModules, 'server/');

	gulp.task('codebot:client', ['codebot:app', 'codebot:curador', 'codebot:social']);

	gulp.task('watch:codebot', () => {
		plugins.watch(['templates/app.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:app', done);
		}));

		plugins.watch(['templates/curador.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:curador', done);
		}));

		plugins.watch(['templates/social.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:social', done);
		}));
		
		plugins.watch(['templates/server.model.json'], plugins.batch((events, done) => {
			gulp.start('codebot:server', done);
		}));
	});

	function task_(name, model, modules, relOutput) {
		gulp.task(name, () => {
			return gulp.src(path.join(config.root, model))
								 .pipe(plugins.codebot({ modules: modules, output: path.join(config.root, relOutput) }))
								 .pipe(gulp.dest(config.root));
		});
	}

}