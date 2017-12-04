'use strict';

<% 
var modelName = _.capitalize($this.name);
-%>
import <%- modelName -%> from './<%- _.lowerCase($this.name) -%>.model';

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

<% if ($this.routes['index']) {%>
/**
 * Get list of <%-$this.plural%>
 * restriction: '<%-$this.routes['index'].auth%>'
 */
export function index(req, res) {
	return <%-modelName%>
					.find({})
					.exec()
					.then(<%-$this.plural-%> => {
						res.status(200).json(<%-$this.plural-%>);
					})
					.catch(handleError(res));
}
<%}-%>

<% if ($this.routes['create']) {%>
/**
 * Creates a new <%-$this.name%>
 * restriction: '<%-$this.routes['create'].auth%>'
 */
export function create(req, res) {
  var new<%-modelName%> = new <%-modelName%>(req.body);
  
	new<%-modelName%>
		.save()
    .then((<%-$this.name%>) => {
      res.json(<%-$this.name%>);
    })
    .catch(validationError(res));
}
<%}-%>

<% if ($this.routes['update']) {%>
/**
 * Updates a <%-$this.name%>
 * restriction: '<%-$this.routes['update'].auth%>'
 */
export function update(req, res) {
	delete req.body._id;
	<%-modelName%>
		.update({ _id: req.params.id}, req.body)
    .then((<%-$this.name%>) => {
      res.json(<%-$this.name%>);
    })
    .catch(validationError(res));
}
<%}-%>

<% if ($this.routes['show']) {%>
/**
 * Get a single <%-$this.name%>
 * restriction: '<%-$this.routes['show'].auth%>'
 */
export function show(req, res, next) {
  var <%-$this.name%>Id = req.params.id;

	return <%-modelName%>
					.findById(<%-$this.name%>Id)
					.exec()
					.then(<%-$this.name%> => {
						if(!<%-$this.name%>) {
							return res.status(404).end();
						}
						res.json(<%-$this.name%>);
					})
					.catch(err => next(err));
}
<%}-%>

<% if ($this.routes['destroy']) {%>
/**
 * Deletes a <%-$this.name%>
 * restriction: '<%-$this.routes['show'].auth%>'
 */
export function destroy(req, res) {
	return <%-modelName%>
					.findByIdAndRemove(req.params.id)
					.exec()
					.then(function() {
						res.status(204).end();
					})
					.catch(handleError(res));
}
<%}-%>