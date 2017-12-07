'use strict';

import writer from './writer';
import qUtils from './query-utils';

var express = require('express');

var router = express.Router();

router.use('/users', require('./user'));
router.use('/categories', qUtils([]), require('./category'));
router.use('/resources', qUtils([]), require('./resource'));
router.use('/herramientas', qUtils([]), require('./herramienta'));

router.use(writer());

module.exports = router;