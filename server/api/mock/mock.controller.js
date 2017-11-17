'use strict';

var data = require('./data');

module.exports = {};

module.exports.index = function index(req, res, next) {
	req.result = data;
	next();
};
