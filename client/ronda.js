'use strict';

import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
// is required from material
//import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngLoader from 'angular-loading-bar';

// WYSIWYG editor
import ngQuill from 'ng-quill';

// file uploader
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;

import ngdropzone from 'ngdropzone';
import mdSteppers from 'md-steppers';

// configs
import { rondaConfig, rondaRun } from './ronda.config';

// componentes
import app from './app';
import curador from './curador';
import social from './social';
import ui from './ui';

//auth
import authModule from './auth/auth.module';

// styles
//import '../node_modules/angular-material/angular-material.scss';
import '../node_modules/dropzone/dist/dropzone.css';
import '../node_modules/md-steppers/dist/md-steppers.css';
import './styles/ronda.scss';

let requirements = [
	uiRouter,
	ngCookies,
	ngResource,
	ngSanitize,
	ngLoader,
	ngMaterial,
	authModule,
	app, 
	curador, 
	social, 
	ui,
	ngQuill,
	'thatisuday.dropzone',
	'md-steppers'
];

var ronda = angular
							.module('ronda', requirements)
							.config(rondaConfig)
							.run(rondaRun)
							.name;

module.exports = ronda;

angular.element(document)
.ready(() => {
	angular.bootstrap(document, [ronda], {
		strictDi: true
	});
});
