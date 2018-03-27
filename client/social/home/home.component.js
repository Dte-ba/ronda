'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular, $mdDialog, $stateParams, ngMeta) {
    super({$element});
    this.$http = $http;
    this.$q = $q;
    this.Api = Restangular;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;

    this.page = 0;
    this.limit = 20;

    this.viewResource = ($event, resource) => { 
      this.viewResource_($event, resource);
    };

    this.sectionName = this.$stateParams.seccion || 'home';
    let sections = {
      'home': {
        caption:  '<h1>Un entorno de educación accesible</h1> <p>para compartir prácticas de enseñanza inclusivas pensadas desde la diversidad</p>',
        title: 'Bienvenido',
        description: 'Ronda es un entorno de educación accesible para compartir prácticas de enseñanza inclusivas pensadas desde la diversidad',
      },
      'propuestas': {
        caption:  '<h1>Propuestas <br /><small>pedagógicas</small></h1> <p>Dinámicas, flexibles y transversales. Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.</p>',
        title: 'Propuestas pedagógicas',
        description: 'Propuestas pedagógicas Dinámicas, flexibles y transversales. Para diseñar tu clase  integrando  nuevas experiencias de aprendizaje.',
        type: 'propuesta'
      },
      'actividades': {
        caption:  '<h1>_Actividades <br />accesibles</h1> <p>Diseñadas  para  participar , interactuar y aprender  en el aula  inclusiva.</p>',
        title: 'Actividades accesibles',
        description: 'Actividades accesibles diseñadas  para  participar , interactuar y aprender  en el aula  inclusiva.',
        type: 'actividad'
      },
      'herramientas': {
        caption:  '<h1>Herramientas_</h1> <p>Software para crear actividades, rampas digitales y entornos editables.</p>',
        title: 'Herramientas',
        description: 'Software para crear actividades, rampas digitales y entornos editables.',
        type: 'herramienta'
      },
      'orientaciones': {
        caption:  '<h1>_Orientaciones</h1> <p>Con tutoriales, documentos y sitios de interés  que sirven de apoyo a tus prácticas de enseñanza.</p>',
        title: 'Orientaciones',
        description: 'Orientaciones con tutoriales y documentación que sirven de apoyo para tus prácticas.',
        type: 'orientacion'
      },
      'mediateca': {
        caption: '<h1>Mediateca_</h1> <p>Recursos didácticos para mirar, leer y escuchar.</p>',
        title: 'Mediateca',
        description: 'Recursos didácticos para mirar, leer y escuchar.',
        type: 'mediateca'
      }
    };
    this.section = sections[this.sectionName];
    ngMeta.setTitle(this.section.title);
    ngMeta.setTag('description', this.section.description);
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('publisheds');
    resources
        .getList({
          page: this.page, 
          limit: this.limit,
          type: this.section ? this.section.type : undefined
        })
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

  viewResource_($event, resource){
		this.$mdDialog.show({
      template: require('../components/modalView/modalView.html'),
      parent: angular.element(document.body),
      targetEvent: $event,
			clickOutsideToClose: true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
        resource: resource
      },
      controller: DialogController,
      controllerAs: '$ctrl'
    })
    .then((data) => {
      console.log(data);
    }, () => {
      
    })
    .catch(function(res) {
      if (!(res === 'cancel' || res === 'escape key press')) {
        throw res;
      }
    });

    function DialogController($scope, $mdDialog, resource, Restangular, $timeout) {
      'ngInject';
      this.loading = true;

      this.Resource = Restangular.one('publisheds', resource._id);
      
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }

      this.Resource
        .get()
        .then(data => {
          this.resource = data;
          this.loading = false;
          $timeout(() => {
            $scope.$apply();
          });
        })
        .catch(err => {
          throw err;
        });      

      this.sumfiles = (files) => {
        return _.sumBy(files, 'size');
      }
    }
  }
}
