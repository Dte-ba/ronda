'use strict';

import OrientacionComponent from './orientacion.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.orientacion', {
      url: '/tablero/orientacion/:uid',
      template: '<curador-orientacion></curador-orientacion>'
    });
}

export default angular.module('ronda.curador.curadorOrientacion', [])
                      .config(routes)
                      .component('curadorOrientacion', {
                        template: require('./orientacion.html'),
                        controller: OrientacionComponent
                      })
                      .name;