import _ from 'lodash';

// tasks
import inject from './inject';
import webpack from './webpack';

export default (gulp, plugins, config) => {
	let tasks = [inject, webpack];

	_.each(tasks, t => {
		t(gulp, plugins, config);
	});
};