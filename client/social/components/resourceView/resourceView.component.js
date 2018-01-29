'use strict';

export default angular
	.module('ronda.social.components.resourceView', [])
	.directive('resourceView', resourceView)
	.name;

class ResourceViewController {
	/*@ngInject*/
	constructor($scope, $element, $state){
		this.$scope = $scope;
		this.$element = $element;
		this.$state = $state;
    this.$element.addClass('resource-card');
    
		this.resource = this.$scope.resource;
		this.editable = this.$scope.editable === true;
		let captions = {
			'propuesta': 'Propuesta pedagógica',
			'actividad': 'Actividad accesible',
			'herramienta': 'Herramienta',
			'orientacion': 'Orientación',
			'mediateca': 'Mediateca',
		};

		this.resource.typeCaption = captions[this.resource.type];
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}
}

function resourceView($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: ResourceViewController,
    controllerAs: '$ctrl',
    scope: {
			resource: '='
    },
		template: require('./resourceView.html')
	}
}