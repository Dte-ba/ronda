'use strict';

import express from 'express';
import uploader from './uploader';

var router = express.Router();

router.use('/file/:filename', require('./file.controller').default);
router.use('/upload', require('./uploader').default);

export default router;