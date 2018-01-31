'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class DashboardComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element,  $q, $http, $log, $state, Restangular, Auth) {
    super({$element, $log});
    this.$q = $q;
    this.$http = $http;
    this.Restangular = Restangular;
    this.$state = $state;
    this.Auth = Auth;

    this.page = 0;
    this.limit = 20;

    this.Resources = this.Restangular.all('resources');

    this.viewResource = ($event, resource) => { 
      this.viewResource_($event, resource);
    };

    this.getUser();
  }

  getUser(){
    this.Auth
    .getCurrentUser()
    .then(user => {
      this.username = user.name;
    });
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let addNewItem = {
      type: 'addnew',
      options: [
        { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas pedagógica' },
        { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
        { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
        { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
        { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' },
      ]
    };

    this.Resources
        .getList({page: this.page, limit: this.limit})
        .then(res => {
          let items = [];
          if (this.page === 1) {
            items.push(addNewItem);
          }
          
          items = items.concat(res);

          let data = {
            count: (res.$total + 1),
            items: items,
            page: this.page,
            limit: this.limit
          };

          def.resolve(data);
        })
        .catch(err => {
          throw err;
        });

    return def.promise;
  }
  
  $onInit(){

  }
  
  viewResource_($event, resource){
    if (!resource){
      return;
    }

    this.$state.go(`curador.recurso`, { uid: resource._id });

  }
}
