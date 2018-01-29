'use strict';

import angular from 'angular';

// componentes
import header from './header/header.component';
import footer from './footer/footer.component';
import resourceCard from './components/resourceCard/resourceCard.component';
import resourceView from './components/resourceView/resourceView.component';
import home from './home';

// config to providers
import { socialConfig } from './social.config';

let requirements = [
	header,
	footer,
	resourceCard,
	resourceView,
	home
];

module.exports = angular
									.module('ronda.social', requirements)
									.config(socialConfig)
									.name;
