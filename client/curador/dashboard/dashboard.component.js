'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class DashboardComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element,  $q, $http) {
    super({$element});
    this.$q = $q;
    this.$http = $http;

    this.page = 0;
    this.limit = 20;
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let items = [{
      type: 'addnew',
      options: [
        { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas pedagógica' },
        { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
        { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
        { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
        { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' },
      ]
    }];

    let data = {
      count: items.length,
      items: items,
      page: this.page,
      limit: this.limit
    };

    def.resolve(data);

    return def.promise;
  }
  
  $onInit(){
    this
      .$http.get('/api/categories/type/os')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
}
