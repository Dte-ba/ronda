'use strict';

import angular from 'angular';
import ngMaterial from 'angular-material';

// configs
import { rondaConfig } from './ronda.config';

// componentes
import app from './app';
import curador from './curador';
import social from './social';
import ui from './ui';

// styles
import '../node_modules/angular-material/angular-material.scss';
import './styles/ronda.scss';

var ronda = angular
							.module('ronda', [app, curador, social, ui, ngMaterial])
							.config(rondaConfig)
							.name;

module.exports = ronda;

angular.element(document)
.ready(() => {
	angular.bootstrap(document, ['ronda'], {
		strictDi: true
	});
});
