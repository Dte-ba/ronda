'use strict';

import angular from 'angular';

import dashboard from './dashboard';
import header from './header/header.component';

// config to providers
import { curadorConfig } from './curador.config';

let requirements = [
	header,
	dashboard
];

module.exports = angular
									.module('ronda.curador', requirements)
									.config(curadorConfig)
									.name;
