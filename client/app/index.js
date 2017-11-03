'use strict';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
// is required from material
//import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
//import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngLoader from 'angular-loading-bar';

// config to providers
import { appConfig } from './app.config';

// componentes
import header from './header/header.component';
import footer from './footer/footer.component';
import home from './home/home.component';

let requirements = [
	uiRouter,
	//ngAnimate,
	ngCookies,
	//ngResource,
	ngSanitize,
	ngLoader,

	header,
	footer,
	home
];

module.exports = angular
									.module('ronda.app', requirements)
									.config(appConfig)
									.name;
