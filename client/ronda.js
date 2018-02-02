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

// RESTFull API
import restangular from 'restangular';

// WYSIWYG editor
import ngQuill from 'ng-quill';

// file uploader
import Dropzone from 'dropzone';
Dropzone.autoDiscover = false;
import ngdropzone from 'ngdropzone';

// expansion panel
import ngExpansionPanel from 'angular-material-expansion-panel';

// MomentJS
import ngMoment from 'angular-moment';

// NumeralJS
import ngNumeraljs from 'angular-numeraljs';

// Datatable
import mdDataTable from 'angular-material-data-table';

// drag and drop 
import ngDragAndDrop from 'angular-drag-and-drop-lists';
console.log(ngDragAndDrop);

// configs
import { rondaConfig, rondaRun } from './ronda.config';

// componentes
import admin from './admin';
import app from './app';
import curador from './curador';
import social from './social';
import ui from './ui';

//auth
import authModule from './auth/auth.module';

// styles
//import '../node_modules/angular-material/angular-material.scss';
//import '../node_modules/dropzone/dist/dropzone.css';
import '../node_modules/angular-material-expansion-panel/dist/md-expansion-panel.css';
import '../node_modules/angular-material-data-table/dist/md-data-table.css';
import './styles/ronda.scss';

let requirements = [
	uiRouter,
	ngCookies,
	ngResource,
	ngSanitize,
	ngLoader,
	ngMaterial,
	restangular,
	ngQuill,
	ngMoment,
	'thatisuday.dropzone',
	'material.components.expansionPanels',
	'ngNumeraljs',
	'dndLists',
	mdDataTable,
	authModule,
	app, 
	curador, 
	admin,
	social, 
	ui
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
