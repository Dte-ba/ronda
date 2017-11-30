'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class DashboardComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element,  Util) {
    super({$element});
    
    this.dzOptions = {
      url : '/upload?relative=somerelative',
      paramName : 'photo',
      maxFilesize : '10',
      acceptedFiles : 'image/jpeg, images/jpg, image/png',
      addRemoveLinks : true,
      headers: Util.getHeaders()
    };

    this.dzCallbacks = {
      'addedfile' : (file) => {
        console.log(file);
        this.newFile = file;
      },
      'success' : (file, xhr) => {
        console.log(file, xhr);
      },
    };

    this.dzMethods = {};
    this.removeNewFile = () => {
      this.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
    }
  }
	
}
