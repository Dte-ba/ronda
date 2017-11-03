'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<app-home></app-home>'
    });
}
