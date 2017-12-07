'use strict';

import MediatecaComponent from './mediateca.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.mediateca', {
      url: '/tablero/mediateca/:uid',
      template: '<curador-mediateca></curador-mediateca>'
    });
}

export default angular.module('ronda.curador.curadorMediateca', [])
                      .config(routes)
                      .component('curadorMediateca', {
                        template: require('./mediateca.html'),
                        controller: MediatecaComponent
                      })
                      .name;