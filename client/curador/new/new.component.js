'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class NewComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element, $stateParams) {
    super({$element});

    this.section = $stateParams.type;
	}
  
  canNext(step){
    return true;
  }

  finish(){
    console.log('finish');
  }

  onEnterStep(step){
    console.log(step);
  }
}
