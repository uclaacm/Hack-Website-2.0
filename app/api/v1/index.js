const express = require('express');
let router = express.Router();

// Route each API
router.use('/event', require('./event').router);
router.use('/showcase', require('./showcase').router);
router.use('/hackschool', require('./hackschool').router);
router.use('/mailinglist', require('./email').router);
module.exports = { router };
