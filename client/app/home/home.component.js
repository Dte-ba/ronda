'use strict';
import angular from 'angular';
import AppComponent from '../app.component';
import _ from 'lodash';

import routes from './home.routes';

class HomeComponent extends AppComponent {
  /*@ngInject*/
  constructor($element, $q) {
    super({$element});
    this.$q = $q;

    this.message = 'Hello';

    this.page = 1;
    this.pageSize = 10;


    // for test
    this.items = [];
    for (var i=0; i < 56; i++){
      let h = Math.floor((Math.random() * 350) + 70);
      this.items.push({ id: i, color: this.randomColor(), height: h });
    }
  }

  fetchData(){
    let def = this.$q.defer();

    setTimeout(() => {
      let items = _.take(_.drop(this.items, (this.page-1)*this.pageSize), this.pageSize);

      let res = {
        page: this.page++,
        items: items,
        total: this.items.length
      };

      def.resolve(res);
    }, 1000);

    return def.promise;
  }

  randomColor(){
    return '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
  }
}

export default angular.module('ronda.app.app-home', [])
  .config(routes)
  .component('appHome', {
    template: require('./home.html'),
    controller: HomeComponent
  })
  .name;
