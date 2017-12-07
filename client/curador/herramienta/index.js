'use strict';

import HerramientaComponent from './herramienta.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.herramienta', {
      url: '/tablero/herramienta/:uid',
      template: '<curador-herramienta></curador-herramienta>',
      authenticate: 'curador'
    });
}

export default angular.module('ronda.curador.curadorHerramienta', [])
                      .config(routes)
                      .component('curadorHerramienta', {
                        template: require('./herramienta.html'),
                        controller: HerramientaComponent
                      })
                      .name;