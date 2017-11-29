'use strict';

import angular from 'angular';

import dashboard from './dashboard';

// config to providers
import { curadorConfig } from './curador.config';

let requirements = [
	dashboard
];

module.exports = angular
									.module('ronda.curador', requirements)
									.config(curadorConfig)
									.name;
