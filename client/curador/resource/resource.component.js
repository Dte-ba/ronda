'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';
import async from 'async';
import _ from 'lodash';

export default class ResourceComponent extends CuradorComponent {
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
	
		this.Resource = this.Restangular.one('resources', this.uid)
		this.Publisheds = this.Restangular.all('publisheds');

		this.resource = { };
    	this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			{ name: 'vinculo', caption: 'Vínculo' },
			{ name: 'publicar', caption: 'Publicar' },
		];

		this.configureDropzone(Util);
		this.configureFunctions();
		this.getResource();
		this.getCategories_();
	}

	$onInit(){
	}

	refreshUI(){
		let captions = {
			'propuesta': 'Propuesta pedagógica',
			'actividad': 'Actividad',
			'herramienta': 'Herramienta',
			'orientacion': 'Orientación',
			'mediateca': 'Mediateca',
		};

		this.headText = captions[this.resource.type];
		this.showViculo = ['propuesta', 'actividad', 'orientacion' ].indexOf(this.resource.type) > -1;
		this.getPublisheds();
	}

	getPublisheds(){
		if (!this.showViculo){
			return;
		}
		this.Publisheds
			.getList()
			.then(publisheds => {
				let filtered = _.filter(publisheds, p => {
					return p._id !== this.uid;
				});

				let captions = {
					'propuesta': 'Propuesta pedagógica',
					'actividad': 'Actividad accesible',
					'herramienta': 'Herramienta',
					'orientacion': 'Orientación',
					'mediateca': 'Mediateca',
				};

				this.publisheds = _.map(filtered, p =>{
					p.typeCaption = captions[p.type];
					return p;
				});
			});
	}

	getCategories_(){
		async.waterfall([
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
				let ac = this.getCategory('accessibility');
				let us = this.getCategory('resource');
				let os = this.getCategory('os');
				
				this.softwares = st.values;
				this.areas = at.values;
				this.niveles = lt.values;
				this.accessibilities = ac.values;
				this.usabilities = us.values;
				this.platforms = os.values;
				cb()
			}
		], err => {
			if (err){
				this.$log.error(err);
			}
		});
	}

	watchResource(){
		this.saveTimes = 0;

		this.$scope.$watch(() => { return this.resource; }, (value) => {
			this.refreshUI();
			this.saveTimes++;
			if (this.saveTimes <= 1){
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
	}

	configureFunctions(){	
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

		this.finish = () => {
			this.loading = true;
			this.resource
				.post('publish')
				.then(data => {
					this.$log.log('published', data);
					this.loading = false;
				})
				.catch(err => {
					throw err;
				});
		}
	}

	configureDropzone(Util){

		var ctrl = this;
   	 this.dzOptions = {
			dictDefaultMessage: '<div class="dz-clickable"></div>',
      url : '/upload?relative=' + this.uid,
			paramName : 'Imágen',
			maxFiles: 1,
			clickable: '.dz-clickable',
      maxFilesize : 100,
      acceptedFiles : 'image/*',
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
				console.log(xhr);
				this.resource.thumbnail = xhr.url;
			},
			'processing': () => {
				
			},
			'queuecomplete': () => {
				ctrl.dropzoneThumbnail.removeAllFiles();
			}
		};

		this.dzOptionsSoftware = _.cloneDeep(this.dzOptions);
		this.dzOptionsSoftware.init = function(){
			// add dropzone to ctrl
			ctrl.dropzoneSoftware = this;
		};
		this.dzOptionsSoftware.acceptedFiles = 'application/*';
		this.maxFiles = Infinity;

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
				//ctrl.dropzoneSoftware.removeAllFiles();
			}
    };
	}

	getResource(){
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
			this.watchResource()
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
				this.$log.log('autosaved', data);
			})
			.catch(err => {
				throw err;
			});
	}

  canNext(step){
    return true;
  }
	
	editTumbnail(){
		
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
