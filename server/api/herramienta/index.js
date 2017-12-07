'use strict';

import {Router} from 'express';
import * as controller from './herramienta.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.hasRole('curador'), controller.destroy);
router.put('/:id', auth.hasRole('curador'), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('curador'), controller.create);

module.exports = router;