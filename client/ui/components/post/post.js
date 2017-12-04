'use strict';

import $ from 'jquery';
import _ from 'lodash';

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
	constructor($scope, $mdDialog, Util, $timeout){
		this.$scope = $scope;
		this.$mdDialog = $mdDialog;

		this.galleryType = 'image-gallery';
		this.message = 'Subir archivos';
		this.editing = false;
		this.canContinue = false;
		
		this.images = [];

    this.dzOptions = {
      url : '/upload',
      paramName : 'Imágen',
      //maxFilesize : '10',
      acceptedFiles : 'image/jpeg, images/jpg, image/png',
      addRemoveLinks : true,
      headers: Util.getHeaders()
    };

    this.dzCallbacks = {
      'addedfile' : (file) => {
				this.showBusyText = true;
			},
			'removedfile' : (file) => {
				_.remove(this.images, i => i._id === file.xhr.response._id);
				this.canContinue = this.images.length > 0;
      },
      'success' : (file, xhr) => {
				xhr.description = xhr.description || '';
				this.images.push(xhr);
			},
			'processing': () => {
				this.canContinue = false;
			},
			'queuecomplete': () => {
				this.canContinue = this.images.length > 0;
			}
    };
	}

	continuar() {
		this.editing = true;
		this.message = 'Describir imagenes';
	}

	cancel(){
		this.$mdDialog.hide(false);
	}

	aceptar(){
		this.$mdDialog.hide({type: this.galleryType, images: this.images});
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
		this.mediaEditing = false;
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
    .then((data) => {
      if (data && !this.mediaEditing){
				let imgs = _.map(data.images, i => {
					return {
						src: i.url,
						description: i.description
					};
				});

				this.modules.push({
					type: data.type,
					content: imgs
				});
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