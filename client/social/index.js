'use strict';

import angular from 'angular';

// componentes
import header from './header/header.component';
import footer from './footer/footer.component';
import home from './home';

// config to providers
import { socialConfig } from './social.config';

let requirements = [
	header,
	footer,
	home
];

module.exports = angular
									.module('ronda.social', requirements)
									.config(socialConfig)
									.name;
