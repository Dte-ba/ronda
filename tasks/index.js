import inject from './inject';
import _ from 'lodash';

export default (gulp, plugins, config) => {
	let tasks = [inject];

	_.each(tasks, t => {
		t(gulp, plugins, config);
	});
};