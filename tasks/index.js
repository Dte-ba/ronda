import inject from './inject';

export default (gulp, plugins, config) => {
	let tasks = [inject];

	tasks.forEach(t => {
		t(gulp, plugins, config);
	});
};