'use strict';
import angular from 'angular';
import AppComponent from '../app.component';
import _ from 'lodash';
import $ from 'jquery';

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
  constructor($scope, $element, $q, $http, Auth, $state, $stateParams, $timeout) {
    super({$element});
    this.$scope = $scope;
    this.$http = $http;
    this.Auth = Auth;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.loadingGoogle = false;
    this.$timeout = $timeout;
  }

  googleLogin(){
    function PopupCenter(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'menubar=false,location=false,resizable=false, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    
        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }

        return newWindow;
    }

    let url = 'http://localhost:3000/auth/google';
    let loginWindow = PopupCenter(url, 'Google Login', 350, 350);

    let interval = setInterval(() => {
      if (loginWindow.closed){
        clearInterval(interval);
        this.$state.go('curador.dashboard');
      }
    }, 100);
    
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
