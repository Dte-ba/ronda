'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class VerComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, $stateParams, Restangular, ngMeta) {
    super({$element});

    let uid = $stateParams.uid;
    this.loading = true;
    this.Resource = Restangular.one('publisheds', uid);
    this.ngMeta = ngMeta;
    
    this.Resource
    .get()
    .then(data => {

      let captions = {
        'propuesta': 'Propuesta pedagógica',
        'actividad': 'Actividad accesible',
        'herramienta': 'Herramienta',
        'orientacion': 'Orientación',
        'mediateca': 'Mediateca',
      };

      data.links = _.map(data.links, p =>{
        p.typeCaption = captions[p.type];
        return p;
      });

      this.resource = data;
      this.loading = false;

			this.ngMeta.setTitle(this.resource.title);
			this.ngMeta.setTag('description', this.resource.summary);
    })
    .catch(err => {
      throw err;
    });
	}
	
}
