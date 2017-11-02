import path from 'path';

export default (gulp, plugins, config) => {
	'use strict';

	let ioOps = {
		src: path.join(config.root, 'client/ui/scss/_components.scss'),
		files: [`${config.root}/client/ui/components/**/*.scss`],
		dest: path.join(config.root, 'client/ui/scss')
	};

	trask('inject:scss:ui', gulp, plugins, ioOps);
};

function transform_(filepath) {
	let newPath = filepath
		.replace(`/src/`, '../src/')
		.replace(/_(.*).scss/, (match, p1, offset, string) => p1)
		.replace('.scss', '');
	return `@import '${newPath}';`;
}
function trask(name, gulp, plguins, ops) {
	gulp.task(name, () => {
		let inject = plugins.inject(
										gulp.src(ops.files, {read: false})
											  .pipe(plugins.sort()), 
										{ transform: transform_ }
									);

		return gulp.src(ops.src)
			.pipe(inject)
			.pipe(gulp.dest(ops.dest));
	});
}