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
  
  // populate categories
  Category
    .find({})
    .remove()
    .then(() => {
      Category.create({
        type: 'nivel',
        values: ['Inicial', 'Primaria', 'CFI', 'Todos'],
        caption: 'Nivel'
      },{
        type: 'area',
        values: ['Prácticas del lenguaje',
          'Matemática',
          'Inglés',
          'Ciencias Naturales',
          'Educación Artística',
          'Educación Física',
          'Construcción de la ciudadanía',
          'Palabras clave',
          'Ciencias Sociales',
          'Formación científico-tecnología',
          'Formación Técnico Específica',
          'Formación profesional u ocupacional',
          'Autonomía personal y social',
          'Otra'
        ],
        caption: 'Area'
      },{
        type: 'os',
        values: ['Android', 'Linux', 'Windows', 'Todos'],
        caption: 'Sistema Operativo'
      },{
        type: 'resource',
        values: ['Presentación', 'Video', 'Plantilla', 'Texto', 'Imágen', 'Audio'],
        caption: 'Tipo de recurso'
      },{
        type: 'accessibility',
        values: ['Accesibilidad Auditiva', 'Accesibilidad Visual', 'Accesibilidad Motora', 'Todas'],
        caption: 'Tipo de accesibilidad'
      },{
        type: 'software',
        values: ['Rampas Digitales', 'Software para crear actividades', 'Software educativos', 'Otro'],
        caption: 'Tipo de software'
      },{
        type: 'orientacion',
        values: ['Tutoriales', 'Documentación', 'Recomendaciones de uso de soft', 'Enlaces de interes', 'Documentación de apoyo', 'Otro'],
        caption: 'Tipo de Orientación'
      })
      .then(() => console.log('finished populating categories'))
      .catch(err => console.log('error populating categories', err));
    });
}
