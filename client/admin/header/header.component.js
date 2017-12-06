'use strict';
import angular from 'angular';

class AdminHeaderComponent {
  /*@ngInject*/
  constructor($element) {
    this.selected = '';
  }
}

export default angular.module('ronda.admin.adminHeader', [])
  .component('adminHeader', {
    template: require('./header.html'),
    controller: AdminHeaderComponent
  })
  .name;
