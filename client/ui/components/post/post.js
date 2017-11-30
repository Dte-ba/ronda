'use strict';

import $ from 'jquery';

export default angular
	.module('ronda-ui.components.post', [])
	.directive('rdPost', rdPost)
	.name;

class TextDialogController {
	/*@ngInject*/
	constructor($scope, $mdDialog){
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
	}

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide(true);
	}

	clear(){
		this.$scope.currentText = '';
	}
}

class MediaDialogController {
	/*@ngInject*/
	constructor($scope, $mdDialog){
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;
	}

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide(true);
	}

	clear(){
	}
}

class RdCardController {
	/*@ngInject*/
	constructor($scope, $element, $timeout, $mdDialog){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;
		this.$element.addClass('rd-post');
		this.$mdDialog = $mdDialog;

		this.modules = [];
		this.$scope.currentText = '<h1>The lorem ipsum</h1><p><br></p><p><span style="color: rgb(0, 0, 0);">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></p>';
		this.textEditing = false;
	}

	addDivisor($event) {
		this.modules.push({
			type: 'divisor',
			content: '<hr />'
		});
	}

	addText(ev) {
		this.$mdDialog.show({
			controller: TextDialogController,
			scope: this.$scope,
			preserveScope: true,
      template: require('./text-dialog.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
			clickOutsideToClose: false,
			controllerAs: '$ctrl',
			fullscreen: false, // Only for -xs, -sm breakpoints.
    })
    .then((add) => {
      if (add && !this.textEditing){
				this.modules.push({
					type: 'text',
					content: this.$scope.currentText
				});
			}
    });
	}

	addMedia(ev) {
		this.$mdDialog.show({
			controller: MediaDialogController,
			scope: this.$scope,
			preserveScope: true,
      template: require('./media-dialog.tmpl.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
			clickOutsideToClose: false,
			controllerAs: '$ctrl',
			fullscreen: false, // Only for -xs, -sm breakpoints.
    })
    .then((add) => {
      if (add && !this.textEditing){
			}
    });
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