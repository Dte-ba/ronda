'use strict';

export default angular
	.module('ronda.social.components.resourceCard', [])
	.directive('resourceCard', resourceCard)
	.name;

class ResourceCardController {
	/*@ngInject*/
	constructor($scope, $element){
		this.$scope = $scope;
    this.$element = $element;
    this.$element.addClass('resource-card');
    
    this.resource = this.$scope.resource;
	}
}

function resourceCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: ResourceCardController,
    controllerAs: '$ctrl',
    scope: {
      resource: '='
    },
		template: require('./resourceCard.html')
	}
}