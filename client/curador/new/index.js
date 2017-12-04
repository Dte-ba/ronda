'use strict';

import NewComponent from './new.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.new', {
      url: '/tablero/new?type',
      template: '<curador-new></curador-new>'
    });
}

export default angular.module('ronda.curador.curadorNew', [])
                      .config(routes)
                      .component('curadorNew', {
                        template: require('./new.html'),
                        controller: NewComponent
                      })
                      .name;