'use strict';

var express = require('express');
var writer = require('./writer');
var qutils = require('./query-utils');
var mock = require('./mock');

var router = express.Router();

router.use('/mock', qutils([]), mock);

router.use(writer());

router.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

module.exports = router;
