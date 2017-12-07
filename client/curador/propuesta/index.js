'use strict';

import PropuestaComponent from './propuesta.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.propuesta', {
      url: '/tablero/propuesta/:uid',
      template: '<curador-propuesta></curador-propuesta>'
    });
}

export default angular.module('ronda.curador.curadorPropuesta', [])
                      .config(routes)
                      .component('curadorPropuesta', {
                        template: require('./propuesta.html'),
                        controller: PropuestaComponent
                      })
                      .name;