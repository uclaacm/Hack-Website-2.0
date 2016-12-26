const express = require('express');
let router = express.Router();

// Route hack school components
router.use('/user', require('./user').router);
router.use('/team', require('./team').router);
router.use('/projects', require('./projects').router);
router.use('/scoreboard', require('./scoreboard').router);

module.exports = { router };
