'use strict';

import Published from './published.model';


/**
 * Get list of publisheds
 * restriction: ''
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	Published
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Published
										.find(query.query)
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.sort(query.sort)
										.select(query.select)
										.exec();
			next();
		});
}


/**
 * Creates a new published
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newPublished = new Published(req.body);
  
	req.result = newPublished.save();
	next();
}


/**
 * Updates a published
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Published.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single published
 * restriction: ''
 */
export function show(req, res, next) {
  var publishedId = req.params.id;

	req.result = Published.findById(publishedId).exec();
	next();
}


/**
 * Deletes a published
 * restriction: ''
 */
export function destroy(req, res, next) {
	req.result =  Published.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}
