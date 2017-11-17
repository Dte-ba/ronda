'use strict';

import angular from 'angular';

import navbar from './components/navbar/navbar';
import navbarItem from './components/navbarItem/navbar-item';
import waterfall from './components/waterfall/waterfall';
import card from './components/card/card';

let requirements = [
	navbar,
	navbarItem,
	waterfall,
	card
];

module.exports = angular
									.module('ronda.ui', requirements)
									.name;
