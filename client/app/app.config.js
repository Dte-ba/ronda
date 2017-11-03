'use strict';

export function appConfig($urlRouterProvider, $locationProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}