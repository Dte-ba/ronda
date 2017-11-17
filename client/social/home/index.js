'use strict';

import HomeComponent from './home.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('social.home', {
      url: '/',
      template: '<social-home></social-home>'
    });
}

export default angular.module('ronda.social.socialHome', [])
                      .config(routes)
                      .component('socialHome', {
                        template: require('./home.html'),
                        controller: HomeComponent
                      })
                      .name;