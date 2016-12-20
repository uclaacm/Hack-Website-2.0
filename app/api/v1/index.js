const express = require('express');
let router = express.Router();

// Route each API
router.use('/event', require('./event').router);

module.exports = { router };
