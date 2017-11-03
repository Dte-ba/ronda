'use strict';
import angular from 'angular';
import AppComponent from '../app.component';

import routes from './home.routes';

class HomeComponent extends AppComponent {
  /*@ngInject*/
  constructor($element) {
		super({$element});
    this.message = 'Hello';
  }
}

export default angular.module('ronda.app.app-home', [])
  .config(routes)
  .component('appHome', {
    template: require('./home.html'),
    controller: HomeComponent
  })
  .name;
