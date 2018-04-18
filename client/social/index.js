'use strict';

import angular from 'angular';

// componentes
import header from './header/header.component';
import footer from './footer/footer.component';
import resourceCard from './components/resourceCard/resourceCard.component';
import resourceView from './components/resourceView/resourceView.component';
import resourceLinks from './components/resourceLinks/resourceLinks.component';
import modalView from './components/modalView/modalView.component';
import home from './home';
import buscar from './buscar';
import ver from './ver';
import guia from './guia';
import institucional from './institucional';
import filters from './social.filter';

// config to providers
import { socialConfig } from './social.config';

let requirements = [
	header,
	footer,
	resourceCard,
	resourceView,
	resourceLinks,
	modalView,
	home,
	buscar,
	ver,
	guia,
	institucional,
	filters
];

module.exports = angular
									.module('ronda.social', requirements)
									.config(socialConfig)
									.name;
