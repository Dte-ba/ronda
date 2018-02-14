'use strict';

import Resource from './resource.model';
import Published from '../published/published.model';
import async from 'async';

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
										.sort({'updatedAt': -1})
										.skip(query.cursor.skip)
										.limit(query.cursor.limit)
										.select(query.cursor.select)
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
								.populate('published')
								.populate('links')
								.exec();
	next();
}


/**
 * Deletes a resource
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	req.result =  Resource.findByIdAndRemove(req.params.id).exec();
	next();
}


/**
 * Publish a resource
 * restriction: 'curador'
 */
export function publish(req, res, next) {
	let resource = req.body;
	let pid = resource.published ? resource.published._id : undefined;
	let published = new Published(resource);

	// find the resource
	if (pid === undefined){
		published.createdAt = new Date();
		published.updatedAt = new Date();
		published
			.save()
			.then(p => {
				delete resource._id;
				resource.published = p._id;
				Resource
					.update({ _id: req.params.id}, req.body)
					.then(p => {
						req.result = Resource
							.findById(req.params.id)
							.populate('owner')
							.populate('files')
							.populate('published')
							.populate('links')
							.exec();
		
						next();
					});
			});
	} else {
		delete published._id;
		published.updatedAt = new Date();
		Published
			.update({ _id: pid}, published)
			.then(p => {
				req.result = Resource
					.findById(req.params.id)
					.populate('owner')
					.populate('files')
					.populate('published')
					.populate('links')
					.exec();

				next();
			});
	}
	
}
