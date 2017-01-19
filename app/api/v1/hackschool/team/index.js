const express = require('express');
let router = express.Router();

// Route each Team API
router.use('/score', require('./score').router);
router.use('/attendance', require('./attendance').router);
module.exports = { router };
