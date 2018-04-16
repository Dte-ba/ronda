'use strict';
import angular from 'angular';
import $ from 'jquery';

class FooterComponent {
  /*@ngInject*/
  constructor($element, $mdMedia) {
    this.version = $('meta[name=version]').attr("content");;

    this.$mdMedia = $mdMedia;
  }
}

export default angular.module('ronda.social.socialFooter', [])
  .component('socialFooter', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
