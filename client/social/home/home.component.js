'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http) {
    super({$element});
    this.$http = $http;
    this.$q = $q;

    this.page = 0;
    this.limit = 20;
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    this.$http
      .get(`/api/mock?page=${this.page}&limit=${this.limit}`)
      .then(response => {
        var data = response.data;

        let res = {
          page: data.page,
          items: data.data,
          total: data.data.length
        };

        def.resolve(res);
      });

    return def.promise;
  }
}
