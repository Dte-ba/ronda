'use strict';

import angular from 'angular';

import navbar from './components/navbar/navbar';
import navbarItem from './components/navbarItem/navbar-item';
import waterfall from './components/waterfall/waterfall';
import card from './components/card/card';
import post from './components/post/post';

let requirements = [
	navbar,
	navbarItem,
	waterfall,
	card,
	post
];

module.exports = angular
									.module('ronda.ui', requirements)
									.name;
