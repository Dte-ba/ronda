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
var morgan = require('morgan');

let env = 'development';
let config = {
	port: 8000,
	ip: 'localhost',
	browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000
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
app.use(morgan('dev'));

/***********************************************
 * 	ROUTES
 */

app.use('/api', require('./api'));

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

if(env === 'development') {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const stripAnsi = require('strip-ansi');
	const webpack = require('webpack');
	const makeWebpackConfig = require('../tasks/webpack.make');
	const webpackConfig = makeWebpackConfig({ DEV: true });
	const compiler = webpack(webpackConfig);
	const browserSync = require('browser-sync').create();

	/**
	 * Run Browsersync and use middleware for Hot Module Replacement
	 */
	browserSync.init({
		open: false,
		logFileChanges: false,
		proxy: `localhost:${config.port}`,
		ws: true,
		middleware: [
			webpackDevMiddleware(compiler, {
				noInfo: false,
				stats: {
					colors: true,
					timings: true,
					chunks: false
				}
			})
		],
		port: config.browserSyncPort,
		plugins: ['bs-fullscreen-message']
	});

	/**
	 * Reload all devices when bundle is complete
	 * or send a fullscreen error message to the browser instead
	 */
	compiler.plugin('done', function(stats) {
		console.log('webpack done hook');
		if(stats.hasErrors() || stats.hasWarnings()) {
			return browserSync.sockets.emit('fullscreen:message', {
				title: 'Webpack Error:',
				body: stripAnsi(stats.toString()),
				timeout: 100000
			});
		}
		browserSync.reload();
	});
}

var server = http.createServer(app);
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);