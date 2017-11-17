'use strict';

// components
import login from './login';

// config to providers
import { appConfig } from './app.config';

let requirements = [ 
	login
];

module.exports = angular
									.module('ronda.app', requirements)
									.config(appConfig)
									.name;
