const express = require('express');
const db = require('../../db');
let router = express.Router();

router.use((req, res, next) => {
	if (!req.user || !req.user.id) {
		log.info("[USER] Unauthorized access at %s, from %s %s", new Date(), req.ip, req.headers['user-agent']);		
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}
	
	next();
});

router.get('/', (req, res) => {
	res.json({
		success: true,
		error: null,
		user: {
			id : req.user.id,
			name: req.user.name,
			profilePicture: req.user.profilePicture
		}
	});
});

module.exports = { router };
