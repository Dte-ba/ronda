'use strict';

import $ from 'jquery';

export default angular
	.module('ronda-ui.components.post', [])
	.directive('rdPost', rdPost)
	.name;

class RdCardController {
	/*@ngInject*/
	constructor($scope, $element, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
		this.$element.addClass('rd-post');

		this.modules = [];
	}

	addDivisor($event) {
		this.modules.push({
			type: 'divisor',
			content: '<hr />'
		});
	}

	addText($event) {
		
	}
}

function rdPost($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdCardController,
		controllerAs: '$rdPostController',
		scope: {
			'ngModel': '='
		},
		template: require('./post.html')
	}
}