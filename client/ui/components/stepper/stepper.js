'use strict';

import _ from 'lodash';

export default angular
	.module('ronda-ui.components.stepper', [])
	.directive('rdStepper', rdStepper)
	.name;

class RdStepperController {
	steps = [];

	/*@ngInject*/
	constructor($scope, $element, $timeout){
		this.$scope = $scope;
    this.$element = $element;
    this.$timeout = $timeout;

		this.$element.addClass('rd-stepper');
		this.currentStepIndex_ = 1;
		this.steps = [
			{ name: 'ficha', 		caption: 'Ficha' },
			{ name: 'recurso', 	caption: 'Recurso' },
			{ name: 'relacion', caption: 'Relación' },
			{ name: 'publicar', caption: 'Publicar' },
		];
	}

	currentStep(){
		return this.steps[this.currentStepIndex_];
	}

	stepStatus(step){
		let idx = _.findIndex(this.steps, { 'name': step.name });

		if (idx > this.currentStepIndex_){
			return 'none';
		}
		
		return idx < this.currentStepIndex_ ? 'completed' : 'editing';
	}

	next(){
		this.currentStep().error = undefined;
		
		let canNextFn = this.$scope.canNext;
		if (typeof canNextFn === 'function'){
			if (!canNextFn(this.currentStep())){
				let st = this.currentStep();
				st.error = true;
				return;
			}
		}

		this.currentStepIndex_++;
	}

	back(){
		this.currentStepIndex_--;
	}

	finish(){
		let finishFn = this.$scope.onFinish;
		if (typeof finishFn === 'function'){
			finishFn();
		}
	}

	showNext(){
		return this.currentStepIndex_ < (this.steps.length-1);
	}

	canBack(){
		return this.currentStepIndex_ > 0;
	}
}

function rdStepper($log){
	'ngInject';

	return {
		restrict: 'E',
		controller: RdStepperController,
		controllerAs: '$rdStepperController',
		scope: {
			rdSteps: '=',
			canNext: '=',
			'onFinish': '='
		},
		template: require('./stepper.html')
	}
}