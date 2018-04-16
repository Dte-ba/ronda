'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class InstitucionalComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta) {
    super({$element});

    this.ngMeta =  ngMeta;

    this.coordinador = 'Daniel Giganti';

    this.teamPedagogico = [
      'Gabriela Sanguintetti ',
      'Patricia Valenzuela',
      'Karina Michalek',
      'Stella Valbueno',
      'Gabriela Tobio ',
      'Daniel Giganti',
    ];

    this.teamDesarrollo = [
      'Rodrigo Bonilla (Diseño Interfaz y comunicación)',
      'María Elina Beltrán (Diseño Interfaz y comunicación)',
      'Delmo Carrozzo (Desarrollo y Arquitectura de software)',
      'Julieta Alessio (Diseño identidad y comunicación)',
      'Melgarejo Agustina (Diseño identidad y comunicación)',
      'Federico Etcheverry (Diseño identidad y comunicación)',
      'Julia Inchaurregui (Diseño UI & UX)',
      'Alejandro Palestrini  (Consulting)',
    ];

    ngMeta.setTitle('Institicional');
    ngMeta.setTag('description', 'Una plataforma educativa diseñada para acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender');
	}
	
}
