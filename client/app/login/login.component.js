'use strict';
import angular from 'angular';
import AppController from '../app.component';
import _ from 'lodash';

export default class LoginComponent extends AppController {
  /*@ngInject*/
  constructor($element, $q, $http) {
    super({$element});
    this.$http = $http;
	}
	
}
