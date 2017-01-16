const express = require('express');
let router = express.Router();

router.use((req, res, next) => {
	if (!req.user || !req.user.id) {
		log.info("Unauthorized access at %s, %s %s", new Date(), req.ip, req.headers['user-agent']);
		return res.json({ success: false, error: "Unauthorized" });
	}

	if (req.user && req.user.state === 'BLOCKED') {
		log.info("Unauthorized access at %s, %s %s", new Date(), req.ip, req.headers['user-agent']);
		return res.json({ success: false, error: "Blocked for abuse" });
	}

	// if (req.user && req.user.state === 'PENDING') {
		// TODO: implement onboarding => ?tutoral=1
	// }

	next();
});

// Route hack school components
router.use('/user', require('./user').router);
router.use('/team', require('./team').router);
router.use('/projects', require('./projects').router);
router.use('/sessions', require('./sessions').router);
router.use('/scoreboard', require('./scoreboard').router);

// Render the dashboard
router.get('/', (req, res) => {
	res.render('hackschool/dashboard');
});

module.exports = { router };
