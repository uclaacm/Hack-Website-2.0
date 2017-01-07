const express = require('express');
let router = express.Router();

// Route hack school components
router.use('/user', require('./user').router);
router.use('/team', require('./team').router);
router.use('/projects', require('./projects').router);
router.use('/sessions', require('./sessions').router);
router.use('/scoreboard', require('./scoreboard').router);

// Render the dashboard
app.get('/', (req, res) => {
	res.render('hackschool/dashboard');
});

module.exports = { router };
