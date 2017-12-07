'use strict';

import Resource from './resource.model';


/**
 * Get list of resources
 * restriction: ''
 */
export function index(req, res, next) {
	req.result = Resource.find({}).exec();
	next();
}


/**
 * Creates a new resource
 * restriction: 'admin'
 */
export function create(req, res, next) {
  var newResource = new Resource(req.body);
  
	req.result = newResource.save();
	next();
}


/**
 * Updates a resource
 * restriction: 'admin'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Resource.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single resource
 * restriction: ''
 */
export function show(req, res, next) {
  var resourceId = req.params.id;

	req.result = Resource.findById(resourceId).exec();
	next();
}


/**
 * Deletes a resource
 * restriction: ''
 */
export function destroy(req, res, next) {
	req.result =  Resource.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}
