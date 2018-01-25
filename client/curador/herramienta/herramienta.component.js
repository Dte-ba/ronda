'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';

export default class HerramientaComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($scope, $element, $stateParams, Auth, Restangular, $log, Util) {
    super({$element, Restangular, $log});

		this.$scope = $scope;
		this.currentStep = 'ficha';
		this.loading = true;
		this.Restangular = Restangular;
		this.$stateParams = $stateParams;
		this.uid = this.$stateParams.uid;
		this.Util = Util;

		var ctrl = this;
    this.dzOptions = {
      url : '/upload?relative=' + this.uid,
			paramName : 'Imágen',
			maxFiles: 1,
			clickable: '.thumbnail__button--edit',
      //maxFilesize : '10',
      acceptedFiles : 'image/jpeg, images/jpg, image/png',
      addRemoveLinks : false,
			headers: Util.getHeaders(),
			init: function(){
				// add dropzone to ctrl
				ctrl.dropzoneThumbnail = this;
			}
		};

    this.dzCallbacks = {
      'addedfile' : (file) => {
				
			},
			'removedfile' : (file) => {
				
      },
      'success' : (file, xhr) => {
				this.resource.thumbnail = xhr.url;
			},
			'processing': () => {
				
			},
			'queuecomplete': () => {
				ctrl.dropzoneThumbnail.removeAllFiles();
			}
    };
		
		this.Resource = this.Restangular.one('resources', this.uid)

		this.resource = { };
    this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			//{ name: 'relacion', caption: 'Relación' },
			{ name: 'publicar', caption: 'Publicar' },
		];
		this.saveTimes = 0;

		this.$scope.$watch(() => { return this.resource; }, (value) => {
			this.saveTimes++;
			if (this.saveTimes <= 2){
				return;
			}
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
		async.waterfall([
			(cb) => {
				this.Resource
				.get()
				.then(data => {
					this.resource = data;
					if (typeof this.resource.area == 'string'){
						this.resource.area = [];
					}
					if (typeof this.resource.nivel == 'string'){
						this.resource.nivel = [];
					}
					this.loading = false;
					cb();
				})
				.catch(cb);
			},
			(cb) => {
				this
					.loadCategories()
					.then(() => cb())
					.catch(cb);
			},
			(cb) => {
				// here init the stuff
				let st = this.getCategory('software');
				let at = this.getCategory('area');
				let lt = this.getCategory('nivel');
				
				this.softwares = st.values;
				this.areas = at.values;
				this.niveles = lt.values;
				cb()
			}
		], err => {
			if (err){
				this.$log.error(err);
			}
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
				this.$log.log('autosaved', data);
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
	
	editTumbnail(){
		console.log(this.dropzoneThumbnail)
	}

	exists(item, list){
		return list.indexOf(item) > -1;
	}

	toggle(item, list){
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
	}

	textSelection(length){
		if (length > 1){
			return 'seleccionados';
		}
		return 'seleccionado';
	}
}
