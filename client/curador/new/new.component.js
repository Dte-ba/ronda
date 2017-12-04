'use strict';
import angular from 'angular';
import CuradorComponent from '../curador.component';

export default class NewComponent extends CuradorComponent {
  /*@ngInject*/
  constructor($element) {
    super({$element});
	}
  
  canNext(step){
    console.log(step);
    return true;
  }

  finish(){
    console.log('finish');
  }
}
