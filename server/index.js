'use strict';

// for now a simple server
var path = require('path');
var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

let env = 'development';
let config = {
	port: 3000,
	ip: 'localhost'
};

config.root = path.resolve(path.join(__dirname, '../'));

var app = express();

if(env === 'development') {
	app.use(express.static(path.join(config.root, '.tmp')));
}

if(env === 'production') {
	app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
}

app.set('appPath', path.join(config.root, 'client'));

app.use(express.static(app.get('appPath')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

/***********************************************
 * 	ROUTES
 */

// All undefined asset or api routes should return a 404
app.route('/:url(api|auth|components|app|bower_components|assets)/*')
	.get(function(req, res, next){
		next(new Error('undefined asset'))
	});

// All other routes should redirect to the index.html
app.route('/*')
	.get((req, res) => {
		res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
	});



if(env === 'development' || env === 'test') {
	app.use(errorHandler()); // Error handler - has to be last
}

var server = http.createServer(app);
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);