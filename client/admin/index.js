'use strict';

// components
import header from './header/header.component';
import users from './users';

// config to providers
import { adminConfig } from './admin.config';

let requirements = [ 
	header,
	users
];

module.exports = angular
									.module('ronda.admin', requirements)
									.config(adminConfig)
									.name;
