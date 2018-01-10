'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class HerramientaComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($scope, $element, $stateParams, Auth, Restangular) {
    super({$element});

		this.$scope = $scope;
		this.currentStep = 'ficha';
		this.loading = true;
		this.Restangular = Restangular;
		this.$stateParams = $stateParams;
		this.uid = this.$stateParams.uid;

		this.Resource = this.Restangular.one('resources', this.uid)

		this.resource = { };
    this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			//{ name: 'relacion', caption: 'Relación' },
			{ name: 'publicar', caption: 'Publicar' },
		];

		this.$scope.$watch(() => { return this.resource; }, (valule) => {
			if (this.saverHandler) {
				clearInterval(this.saverHandler);
			}
			this.saverHandler = setInterval(() => {
				this.saveResource();
				clearInterval(this.saverHandler);
			}, 500);
		}, true);
		
		this.onEnterStep = (step) => {
			this.currentStep = step.name;
		};

		this.save = () => {
			this.saveResource();
		};
	}

	$onInit(){
		this.Resource
			.get()
			.then(data => {
				this.resource = data;
				this.loading = false;
			})
			.catch(err => {
				throw err;
			});
	}

	$onDestroy() {
		if (this.saverHandler) {
			clearInterval(this.saverHandler);
		}
	}
	
	saveResource(){
		this.resource
			.put()
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				throw err;
			});
	}

  canNext(step){
    return true;
  }

  finish(){
    console.log('finish');
  }
	
}
