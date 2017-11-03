'use strict';
import angular from 'angular';

class FooterComponent {
  /*@ngInject*/
  constructor($element) {
    this.message = 'Hello';
  }
}

export default angular.module('ronda.app.app-footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
