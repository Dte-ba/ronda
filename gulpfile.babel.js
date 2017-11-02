import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import tasksFactory from './tasks';

let plugins = gulpLoadPlugins();

let util = plugins.util;

let config = {
	root: __dirname
};

tasksFactory(gulp, plugins, config);