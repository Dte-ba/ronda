'use strict';

import $ from 'jquery';

const HIEGHT_BREACKPOINT = 100;

export default angular
	.module('ronda-ui.components.navbar', [])
	.directive('rdNavbar', RdNavbar)
	.name;

class RdNavbarController {
	/*@ngInject*/
	constructor($scope, $element, $window, $mdMedia, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;

		this.logo = $scope.logo;
		this.logoScrolled = $scope.logoScrolled;

    this.$element.addClass('rd-navbar md-whiteframe-4dp');

    this.$scope.$watch(() => { return $mdMedia('xs') || $mdMedia('sm'); }, (mobile) => {
    	this.isMobile = mobile === true;
    });

    let clsScrolled = 'rd-navbar--scrolled';

    $(document).ready(() => {
		  var scrollTop = 0;
		  $(window).scroll(() => {
		    scrollTop = $(window).scrollTop();
		    if (scrollTop >= HIEGHT_BREACKPOINT) {
		      this.$element.addClass(clsScrolled);
		    } else if (scrollTop < HIEGHT_BREACKPOINT) {
		      this.$element.removeClass(clsScrolled);
		    } 

		    this.removeDropdown();
		  }); 

		  $(document).click(() => {
		  	this.removeDropdown();
		  });
		});

		// the dropdown
		this.dropdownOpened = false;
		this.toggleDropdown = ($event) => {
			this.dropdownOpened = !this.dropdownOpened;
			$event.stopPropagation();
		};
	}

	removeDropdown(){
		// remove the dropdown
    if (this.dropdownOpened) {
    	this.dropdownOpened = false;
    	this.$timeout(() => {
    		this.$apply();
    	});
    }
	}
}

function RdNavbar($window){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdNavbarController,
		controllerAs: '$rdNavbarController',
		scope: {
			logo: '@logo',
			logoScrolled: '@logoScrolled'
		},
		transclude: {
			'items': 'rdNavbarNavigation',
			'tools': 'rdNavbarTools',
			'body': '?rdNavbarBody'
		},
		template: require('./navbar.html')
	}
}