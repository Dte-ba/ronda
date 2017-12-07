'use strict';

import Herramienta from './herramienta.model';


/**
 * Get list of herramientas
 * restriction: 'authenticate'
 */
export function index(req, res, next) {
	req.result = Herramienta.find({}).exec();
	next();
}


/**
 * Creates a new herramienta
 * restriction: 'curador'
 */
export function create(req, res, next) {
  var newHerramienta = new Herramienta(req.body);
  
	req.result = newHerramienta.save();
	next();
}


/**
 * Updates a herramienta
 * restriction: 'curador'
 */
export function update(req, res, next) {
	delete req.body._id;

	req.result = Herramienta.update({ _id: req.params.id}, req.body);
	next();
}


/**
 * Get a single herramienta
 * restriction: 'authenticate'
 */
export function show(req, res, next) {
  var herramientaId = req.params.id;

	req.result = Herramienta.findById(herramientaId).exec();
	next();
}


/**
 * Deletes a herramienta
 * restriction: 'authenticate'
 */
export function destroy(req, res, next) {
	req.result =  Herramienta.findByIdAndRemove(req.params.id).exec();
	req.statusCode = 204;
	next();
}
