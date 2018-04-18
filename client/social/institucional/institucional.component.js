'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class InstitucionalComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta) {
    super({$element});

    this.ngMeta =  ngMeta;

    this.coordinador = 'Daniel Giganti';

    this.teamBA = [
      { cargo: 'Gobernadora', name: 'Lic. María Eugenia Vidal' },
      { cargo: 'Vicegobernador ', name: 'Dr. Daniel Salvador' },
      { cargo: 'Director General de Cultura y Educación ', name: 'Lic. Gabriel Sanchez Zinny' },
      { cargo: 'Vicepresidente 1º del Consejo General de Cultura y Educación ', name: 'Lic. Diego Martínez' },
      //{ cargo: 'Jefe de Gabinete de Asesores ', name: 'Don Javier Mezzamico' },
      { cargo: 'Subsecretario de Educación ', name: 'Lic. Sergio Siciliano' },
      { cargo: 'Subsecretaria de Políticas Docentes y Gestión Territorial ', name: 'Dra. Florencia Castro' },
      { cargo: 'Director de Educación Especial', name: 'Lic. Daniel G. del Torto' },
      { cargo: 'Directora de Innovación y Tecnología Educativa', name: 'Prof. Liliana Vigolo' },
    ];

    this.teamPedagogico = [
      '<strong>Prof. Daniel Giganti</strong> (Coordinador de contenido pedagógico)',
      '<strong>Prof. Gabriela Sanguinetti</strong> (Contenidista)',
      '<strong>Prof. Patricia Valenzuela</strong> (Contenidista)',
      '<strong>Prof. Karina Michalek</strong> (Contenidista)',
      '<strong>Lic. Stella Valbueno</strong> (Contenidista)',
      '<strong>Prof. Gabriela Tobio</strong> (Contenidista)',
    ];

    this.teamDesarrollo = [
      '<strong>Rodrigo Bonilla</strong> (Diseño Interfaz y comunicación)',
      '<strong>María Elina Beltrán</strong> (Diseño Interfaz y comunicación)',
      '<strong>Delmo Carrozzo</strong> (Desarrollo y Arquitectura de software)',
      '<strong>Julieta Alessio</strong> (Diseño identidad y comunicación)',
      '<strong>Melgarejo Agustina</strong> (Diseño identidad y comunicación)',
      '<strong>Federico Etcheverry</strong> (Diseño identidad y comunicación)',
      '<strong>Julia Inchaurregui</strong> (Diseño UI & UX)'
    ];

    ngMeta.setTitle('Institicional');
    ngMeta.setTag('description', 'Ronda una plataforma educativa diseñada para acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender');
	}
	
}
