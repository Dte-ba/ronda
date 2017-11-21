'use strict';
import angular from 'angular';
import <%- _.capitalize($model.module.name) -%>Controller from '../<%-$model.module.name-%>.component';

export default class <%- _.capitalize($this.name) -%>Component extends <%- _.capitalize($model.module.name) -%>Controller {
  /*@ngInject*/
  constructor($element) {
    super({$element});
	}
	
}
