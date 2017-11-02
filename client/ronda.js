'use strict';

import angular from 'angular';

// configs
import { rondaConfig } from './config';

// componentes
import app from './app';
import curador from './curador';
import social from './social';
import ui from './ui';

// styles
import 'styles/ronda.scss';

var ronda = angular
							.module('ronda', [app, curador, social, ui])
							.config(rondaConfig)
							.name;

module.exports = ronda;