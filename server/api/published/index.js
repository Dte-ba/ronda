'use strict';

import {Router} from 'express';
import * as controller from './published.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', querymen.middleware(), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);

module.exports = router;