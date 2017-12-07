'use strict';

import Category from './category.model';


/**
 * Get list of categories
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	req.result = Category.find({}).exec();
	next();
}



/**
 * Updates a category
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Category.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single category
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var categoryId = req.params.id;

	req.result = Category.findById(categoryId).exec();
	next();
}

/**
 * Get a single category
 * restriction: 'authenticate'
 */
export function showByType(req, res, next) {
  var categoryType = req.params.type;

	req.result = Category.findOne({ type: categoryType}).exec();
	next();
}