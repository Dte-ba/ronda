'use strict';

import Resource from './resource.model';


/**
 * Get list of resources
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	var query = req.querymen;
	
	Resource
		.find({})
		.count()
		.exec((err, count) => {
			if (err){
				return next(err);
			}
			req.totalItems = count;
			req.result = Resource
										.find(query.query)
										.populate('owner')
										.populate('files')
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.sort(query.sort)
										.select(query.select)
										.exec();
			next();
		});
}


/**
 * Creates a new resource
 * restriction: 'curador'
 */
export function create(req, res, next) {
  var newResource = new Resource(req.body);
  
	req.result = newResource.save();
	next();
}


/**
 * Updates a resource
 * restriction: 'curador'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Resource.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single resource
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var resourceId = req.params.id;

	req.result = Resource
								.findById(resourceId)
								.populate('owner')
								.populate('files')
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	req.result =  Resource.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}
