'use strict';

import {Router} from 'express';
import * as controller from './<%- _.lowerCase($this.name) -%>.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

<% 
_.each(_.keys($this.routes), function(key) {
	var route = $this.routes[key];
	var auth = '';
	if (route.auth === 'authenticate'){
		auth = ', auth.isAuthenticated()';
	} else if (typeof route.auth === 'string') {
		auth = ", auth.hasRole('"+route.auth+"')";
	}
-%>
router.<%- route.method %>('<%- route.route %>'<%- auth %>, controller.<%-key%>);
<%})-%>

module.exports = router;