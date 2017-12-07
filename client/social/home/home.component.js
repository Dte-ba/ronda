'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular) {
    super({$element});
    this.$http = $http;
    this.$q = $q;
    this.Api = Restangular;

    this.page = 0;
    this.limit = 20;
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('resources');
    resources
        .getList({page: this.page, limit: this.limit })
        .then(data => {
          let res = {
            page: data.$page,
            items: data,
            total: data.$total
          };
  
          def.resolve(res);
        })

    return def.promise;
  }
}
