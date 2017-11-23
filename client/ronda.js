'use strict';

import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
// is required from material
//import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
//import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngLoader from 'angular-loading-bar';

// configs
import { rondaConfig } from './ronda.config';

// componentes
import app from './app';
import curador from './curador';
import social from './social';
import ui from './ui';

// styles
//import '../node_modules/angular-material/angular-material.scss';
import './styles/ronda.scss';

let requirements = [
	uiRouter,
	ngCookies,
	ngSanitize,
	ngLoader,
	ngMaterial,
	app, 
	curador, 
	social, 
	ui
];

var ronda = angular
							.module('ronda', requirements)
							.config(rondaConfig)
							.name;

module.exports = ronda;

angular.element(document)
.ready(() => {
	angular.bootstrap(document, [ronda], {
		strictDi: true
	});
});
