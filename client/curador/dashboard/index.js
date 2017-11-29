'use strict';

import DashboardComponent from './dashboard.component';

let routes = function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('curador.dashboard', {
      url: '/tablero',
      template: '<curador-dashboard></curador-dashboard>',
      authenticate: 'curador'
    });
}

export default angular.module('ronda.curador.curadorDashboard', [])
                      .config(routes)
                      .component('curadorDashboard', {
                        template: require('./dashboard.html'),
                        controller: DashboardComponent
                      })
                      .name;