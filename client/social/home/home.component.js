'use strict';
import angular from 'angular';
import SocialController from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialController {
  /*@ngInject*/
  constructor($element, $q, $http) {
    super({$element});
    this.$http = $http;
    this.$q = $q;

    this.message = 'Hello';

    this.page = 0;
    this.limit = 20;


    // for test
    this.items = [];
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

  randomColor(){
    return '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
  }
}
