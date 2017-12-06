'use strict';

import {Router} from 'express';
import * as controller from './category.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.get('/type/:type', auth.isAuthenticated(), controller.showByType);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;