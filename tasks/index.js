import _ from 'lodash';

// tasks
import inject from './inject';
import webpack from './webpack';
import server from './server';
import codebot from './codebot';

export default (gulp, plugins, config) => {
	let tasks = [inject, webpack, server];

	_.each(tasks, t => {
		t(gulp, plugins, config);
	});
};