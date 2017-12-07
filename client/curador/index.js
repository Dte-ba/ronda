'use strict';

import angular from 'angular';

import header from './header/header.component';
import dashboard from './dashboard';
import newResource from './new';
import propuesta from './propuesta';
import actividad from './actividad';
import herramienta from './herramienta';
import orientacion from './orientacion';
import mediateca from './mediateca';

// config to providers
import { curadorConfig } from './curador.config';

let requirements = [
	header,
	dashboard,
	newResource,
	propuesta,
	actividad,
	herramienta,
	orientacion,
	mediateca,
];

module.exports = angular
									.module('ronda.curador', requirements)
									.config(curadorConfig)
									.name;
