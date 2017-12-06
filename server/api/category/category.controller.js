'use strict';

import Category from './category.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}


/**
 * Get list of categories
 * restriction: 'authenticate'
 */
export function index(req, res) {
	return Category
					.find({})
					.exec()
					.then(categories => {
						res.status(200).json(categories);
					})
					.catch(handleError(res));
}



/**
 * Updates a category
 * restriction: 'admin'
 */
export function update(req, res) {
	delete req.body._id;
	Category
		.update({ _id: req.params.id}, req.body)
    .then((category) => {
      res.json(category);
    })
    .catch(validationError(res));
}


/**
 * Get a single category
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var categoryId = req.params.id;

	return Category
					.findById(categoryId)
					.exec()
					.then(category => {
						if(!category) {
							return res.status(404).end();
						}
						res.json(category);
					})
					.catch(err => next(err));
}


/**
 * Get a single category by type
 * restriction: 'authenticate'
 */
export function showByType(req, res, next) {
  var categoryType = req.params.type;

	return Category
					.findOne({ type: categoryType })
					.exec()
					.then(category => {
						if(!category) {
							return res.status(404).end();
						}
						res.json(category);
					})
					.catch(err => next(err));
}
