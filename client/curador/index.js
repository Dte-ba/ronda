'use strict';

import angular from 'angular';

import header from './header/header.component';
import dashboard from './dashboard';
import newResource from './new';

// config to providers
import { curadorConfig } from './curador.config';

let requirements = [
	header,
	dashboard,
	newResource
];

module.exports = angular
									.module('ronda.curador', requirements)
									.config(curadorConfig)
									.name;
