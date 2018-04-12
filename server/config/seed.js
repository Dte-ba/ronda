/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Category from '../api/category/category.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(!config.seedDB) {
    return;
  }

  // populate users
  /*
  User.find({}).remove()
    .then(() => {
      User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@ronda',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@ronda',
        password: 'admin'
      }, {
        provider: 'local',
        role: 'curador',
        name: 'Curador',
        email: 'curador@ronda',
        password: 'curador'
      })
      .then(() => console.log('finished populating users'))
      .catch(err => console.log('error populating users', err));
    });
  */
  
  // populate categories
  Category
    .find({})
    .remove()
    .then(() => {
      Category.create({
        type: 'nivel',
        values: ['Inicial', 'Secundaria', 'Primaria primer ciclo', 'Primaria segundo ciclo', 'Centro de formacion integral'],
        caption: 'Nivel'
      },{
        type: 'area',
        values: [
          'Autonomía personal y social',
          'Ciencias Naturales',
          'Ciencias Sociales',
          'Construcción de la ciudadanía',
          'Educación Artística',
          'Educación Física',
          'Formación científico-tecnología',
          'Formación profesional u ocupacional',
          'Formación Técnico Específica',
          'Inglés',
          'Matemática',
          'Prácticas del lenguaje',
        ],
        caption: 'Area'
      },{
        type: 'os',
        values: ['Android', 'Linux', 'Windows'],
        caption: 'Sistema Operativo'
      },{
        type: 'resource',
        values: ['Presentación', 'Video', 'Plantilla', 'Texto', 'Imágen', 'Audio'],
        caption: 'Tipo de recurso'
      },{
        type: 'accessibility',
        values: ['Accesibilidad Auditiva', 'Accesibilidad Visual', 'Accesibilidad Motora'],
        caption: 'Tipo de accesibilidad'
      },{
        type: 'software',
        values: ['Rampa Digital', 'Para crear y editar', 'Con contenido cerrado', 'Soporte'],
        caption: 'Tipo de software'
      },{
        type: 'orientacion',
        values: ['Tutoriales', 'Documentación', 'Recomendaciones de uso de soft', 'Enlaces de interés', 'Documentación de apoyo'],
        caption: 'Tipo de Orientación'
      })
      .then(() => console.log('finished populating categories'))
      .catch(err => console.log('error populating categories', err));
    });
}
