'use strict';

import angular from 'angular';

import navbar from './components/navbar/navbar';
import navbarItem from './components/navbarItem/navbar-item';
import waterfall from './components/waterfall/waterfall';

let requirements = [
	navbar,
	navbarItem,
	waterfall,
];

module.exports = angular
									.module('ronda.ui', [])
									.name;
