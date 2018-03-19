'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';

export default class HomeComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $q, $http, Restangular, $mdDialog, $stateParams) {
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

    this.sectionName = this.$stateParams.seccion;
    let sections = {
      'propuestas': {
        caption:  '<h1>Propuestas <br /><small>pedagógicas</small></h1> <p>Abiertas y flexibles que sirven para planificar tu clase inslusiva.</p>',
        image: '/assets/img/banner/propuestas_image.png',
        back: '/assets/img/banner/propuestas_back.png',
      },
      'actividades': {
        caption:  '<h1>_Actividades <br />accesibles</h1> <p>Que utilizan herramientas y software de apoyo. Podés adaptarlas a tu propuesta.</p>',
        image: '/assets/img/banner/actividades_image.png',
        back: '/assets/img/banner/actividades_back.png',
      },
      'herramientas': {
        caption:  '<h1>Herramientas_</h1> <p>Software para actividades, rampas digitales y entornos editables.</p>',
        image: '/assets/img/banner/herramientas_image.png',
        back: '/assets/img/banner/herramientas_back.png',
      },
      'orientaciones': {
        caption:  '<h1>_Orientaciones</h1> <p>Con tutoriales y documentación que sirven de apoyo para tus prácticas.</p>',
        image: '/assets/img/banner/orientaciones_image.png',
        back: '/assets/img/banner/orientaciones_back.png',
      },
      'mediateca': {
        caption: '<h1>Mediateca_</h1> <p>Recursos digitales para mirar, leer y escuchar.</p>' ,
        image: '/assets/img/banner/mediateca_image.png',
        back: '/assets/img/banner/mediateca_back.png',
      }
    };
    this.section = sections[this.sectionName];
  }

  fetchData(){
    let def = this.$q.defer();

    this.page++;
    let resources = this.Api.all('publisheds');
    resources
        .getList({
          page: this.page, 
          limit: this.limit
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
