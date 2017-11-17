'use strict';
import angular from 'angular';

class HeaderComponent {
  /*@ngInject*/
  constructor($element) {
    this.selected = '';
    
    this.navbarItems = [
      { section: 'propuestas', icon: 'ri ri-propuestas', caption: 'Propuestas' },
      { section: 'actividades', icon: 'ri ri-actividades', caption: 'Actividades' },
      { section: 'herramientas', icon: 'ri ri-herramienta', caption: 'Herramientas' },
      { section: 'orientaciones', icon: 'ri ri-orientaciones', caption: 'Orientaciones' },
      { section: 'mediateca', icon: 'ri ri-mediateca', caption: 'Mediateca' },
    ];
  }
  
  itemClicked(item) {
    if (this.selected === item.section){
      return;
    }
    this.selected = item.section;
  }
}

export default angular.module('ronda.app.socialHeader', [])
  .component('socialHeader', {
    template: require('./header.html'),
    controller: HeaderComponent
  })
  .name;
