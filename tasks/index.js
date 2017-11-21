import _ from 'lodash';

// tasks
import inject from './inject';
import webpack from './webpack';
import server from './server';
import codebot from './codebot';
import icons from './icons';

export default (gulp, plugins, config) => {
	let tasks = [inject, webpack, server, codebot, icons];

	_.each(tasks, t => {
		t(gulp, plugins, config);
	});
};