'use strict';

import {Router} from 'express';
import * as controller from './resource.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', auth.isAuthenticated(), querymen.middleware(), controller.index);
router.delete('/:id', auth.hasRole('curador'), controller.destroy);
router.put('/:id', auth.hasRole('curador'), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/:id/publish', auth.hasRole('curador'), controller.publish);
router.post('/', auth.hasRole('curador'), controller.create);

module.exports = router;