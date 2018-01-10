'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import _ from 'lodash';
import async from 'async';

export default class NewComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams, $timeout, Auth, Restangular) {
    super({$element});
    this.$timeout = $timeout;
    this.$state = $state;
    this.Restangular = Restangular;
    this.Auth = Auth;

    let types = /^(propuestas|actividades|herramientas|orientaciones|mediateca)$/ig;
    this.section = _.toLower($stateParams.type);

    if (!types.test(this.section)){
      this.error = `Argumento invalido ${this.section}`;
    }
  }
  
  $onInit(){
    if (this.error){
      this.$timeout(() => {
        this.$state.go('curador.dashboard');
      }, 2000);
      return;
    }
    // create the object
    this.createResource(this.section);
  }

  createResource(section) {

    let dbtypes = {
      'propuestas': 'propuesta',
      'actividades': 'actividad',
      'herramientas': 'herramienta',
      'orientaciones': 'orientacion',
      'mediateca': 'mediateca',
    };
    
    let type = dbtypes[section];
    let resource = this.Restangular.all('resources');
    
    async.waterfall([
      // get the user
      (cb) => {
        this.Auth
          .getCurrentUser()
          .then(user => {
            cb(null, user);
          })
          .catch(cb);
      },
      (user, cb) => {
        let data = {
          type: type,
          title: '',
          summary: '',
          thumbnail: '',
          nivel: '',
          area: '',
          category: '',
          post: [],
          tags: [],
          owner: user._id,
          collaborators: [],
          publishResource: '',
          files: [],
        };
        resource
          .post(data)
          .then(data => {
            cb(null, data);
          })
          .catch(cb);
      }
    ], (err, data) => {
      if (err){
        throw err;
      }

      this.$state.go(`curador.${section}`, { uid: data._id });
    });
  }
}
