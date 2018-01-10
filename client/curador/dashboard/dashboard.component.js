'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class DashboardComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element,  $q, $http, Restangular) {
    super({$element});
    this.$q = $q;
    this.$http = $http;
    this.Restangular = Restangular;

    this.page = 0;
    this.limit = 20;

    this.Resources = this.Restangular.all('resources');
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
  
}
