'use strict';

export function curadorConfig($stateProvider) {
	'ngInject';
	
	$stateProvider
	.state('curador', {
		abstract: true,
		template: `
			<main ui-view=""></main>
		`
	});
}