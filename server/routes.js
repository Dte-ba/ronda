/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {

  //app.all('/*', function(req, res, next) {
  //  // CORS headers
  //  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  //  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //  // Set custom headers for CORS
  //  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  //  if (req.method == 'OPTIONS') {
  //    res.status(200).end();
  //  } else {
  //    next();
  //  }
  //});
  
  app.use('/api', require('./api'));

  app.use('/auth', require('./auth').default);

  app.use(require('./files').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
