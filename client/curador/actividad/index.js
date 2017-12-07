'use strict';

import ActividadComponent from './actividad.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.actividad', {
      url: '/tablero/actividad/:uid',
      template: '<curador-actividad></curador-actividad>'
    });
}

export default angular.module('ronda.curador.curadorActividad', [])
                      .config(routes)
                      .component('curadorActividad', {
                        template: require('./actividad.html'),
                        controller: ActividadComponent
                      })
                      .name;