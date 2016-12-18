const express = require('express');
let router = express.Router();

// Route each API
router.use('/events', require('./events').router);

module.exports = { router };
