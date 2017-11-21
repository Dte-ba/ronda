'use strict';

import path from 'path';
import runSequence from 'run-sequence';

export default (gulp, plugins, config) => {
	let clientModules = [
		path.join(config.root, 'templates/client/route')
	];
	
	task_('codebot:app', 'templates/app.model.json', clientModules, 'client/');
	task_('codebot:curador', 'templates/curador.model.json', clientModules, 'client/');
	task_('codebot:social', 'templates/social.model.json', clientModules, 'client/');

	gulp.task('codebot:client', ['codebot:app', 'codebot:curador', 'codebot:social']);

	function task_(name, model, modules, relOutput) {
		gulp.task(name, () => {
			return gulp.src(path.join(config.root, model))
								 .pipe(plugins.codebot({ modules: modules, output: path.join(config.root, relOutput) }))
								 .pipe(gulp.dest(config.root));
		});
	}

}