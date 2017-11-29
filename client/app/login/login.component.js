'use strict';
import angular from 'angular';
import AppComponent from '../app.component';
import _ from 'lodash';

export default class LoginComponent extends AppComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $state;

  /*@ngInject*/
  constructor($element, $q, $http, Auth, $state, $stateParams) {
    super({$element});
    this.$http = $http;
    this.Auth = Auth;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }
  
  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('curador.dashboard');
      })
      .catch(err => {
        this.errors.login = err.message;
      });
    }
  }
	
}
