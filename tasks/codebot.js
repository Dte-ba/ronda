'use strict';

import path from 'path';
import runSequence from 'run-sequence';

export default (gulp, plugins, config) => {
	let clientModules = [
		path.join(config.root, 'templates/client/route')
	];

	gulp.task('codebot:app', () => {
		return gulp.src(path.join(config.root, 'templates/app.model.json'))
							 .pipe(plugins.codebot({ modules: clientModules, output: path.join(config.root, 'client/') }))
							 .pipe(gulp.dest(config.root));
	});

}