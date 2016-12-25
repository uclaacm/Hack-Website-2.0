const express = require('express');
const db = require('../../db');
let router = express.Router();

router.use((req, res, next) => {
	if (!req.user || !req.user.id)
		return res.status(401).json({ success: false, error: "Unauthorized" });
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
