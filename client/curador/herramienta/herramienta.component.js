'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';

export default class HerramientaComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($scope, $element, $stateParams, Auth, Restangular, $log, Util, $timeout) {
    super({$element, Restangular, $log});

		this.$scope = $scope;
		this.currentStep = 'ficha';
		this.loading = true;
		this.Restangular = Restangular;
		this.$stateParams = $stateParams;
		this.uid = this.$stateParams.uid;
		this.Util = Util;
		this.$timeout = $timeout;
		this.init = true;

		var ctrl = this;
    this.dzOptions = {
			dictDefaultMessage: '<div class="dz-clickable"></div>',
      url : '/upload?relative=' + this.uid,
			paramName : 'Imágen',
			maxFiles: Infinity,
			clickable: '.dz-clickable',
      maxFilesize : 100,
      acceptedFiles : 'application/*',
      addRemoveLinks : false,
			headers: Util.getHeaders(),
			init: function(){
				// add dropzone to ctrl
				ctrl.dropzoneThumbnail = this;
			}
		};


		this.dzOptionsSoftware = this.dzOptions;
		this.dzOptionsSoftware.init = function(){
			// add dropzone to ctrl
			ctrl.dropzoneSoftware = this;
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
		
		this.dzCallbacksSoftware = {
      'addedfile' : (file) => {
				
			},
			'removedfile' : (file) => {
				
      },
      'success' : (file, xhr) => {
				this.resource.files.push(xhr);
			},
      'error' : (err) => {
				this.$log.error(err);
			},
			'processing': () => {
				
			},
			'queuecomplete': () => {
				ctrl.dropzoneSoftware.removeAllFiles();
			}
    };
		
		this.Resource = this.Restangular.one('resources', this.uid)

		this.resource = { };
    this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			{ name: 'vinculo', caption: 'Vínculo' },
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
			this.$timeout(() => {
				this.currentStep = step.name;
				
				if (!this.init && !this.loading){
					this.resource.step = this.currentStep;
				}
				
				this.init = false;
				this.$scope.$apply();
			});
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
					if (this.resource.step){
						let idx = _.findIndex(this.steps, { name: this.resource.step });
						this.initStepIndex = idx === -1 ? undefined : idx;
						
					}
					this.loading = false;

					console.log(this.resource.files)
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

	removeAllFiles(){
		this.resource.files.splice(0, this.resource.files.length)
	}

	sumfiles(files){
		return _.sumBy(files, 'size');
	}
}
