'use strict';
import angular from 'angular';

class HeaderComponent {
  /*@ngInject*/
  constructor($element, $state, $stateParams) {
    this.selected = '';
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.navbarItems = [
      { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas' },
      { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
      { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
      { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
      { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' },
    ];
  }

  $onInit(){
    this.selected = this.$stateParams.seccion;
  }
  
  itemClicked(item) {
    if (this.selected === item.section){
      return;
    }
    this.$state.go('.', { seccion: item.section });
    this.selected = item.section;
  }
}

export default angular.module('ronda.social.socialHeader', [])
  .component('socialHeader', {
    template: require('./header.html'),
    controller: HeaderComponent
  })
  .name;
