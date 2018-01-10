'use strict';

export default angular
	.module('ronda.social.components.resourceCard', [])
	.directive('resourceCard', resourceCard)
	.name;

class ResourceCardController {
	/*@ngInject*/
	constructor($scope, $element, $state){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
    this.$element.addClass('resource-card');
    
		this.resource = this.$scope.resource;
		this.editable = this.$scope.editable === true;
	}

	editResource(){
		this.$state.go(`curador.${this.resource.type}`, { uid: this.resource._id });
	}
}

function resourceCard($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: ResourceCardController,
    controllerAs: '$ctrl',
    scope: {
			resource: '=',
			editable: '='
    },
		template: require('./resourceCard.html')
	}
}