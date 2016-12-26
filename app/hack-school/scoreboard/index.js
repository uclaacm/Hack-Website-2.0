const express = require('express');
const db = require('../../db');
let router = express.Router();

router.get('/', (req, res) => {
	if (!req.user || !req.user.id)
		return res.json({ success: false, error: "Unauthorized" });
	
	db.Team.getAll((err, teams) => {
		if (err)
			return res.status(500).json({ success: false, error: err, scoreboard: [] });

		teams = teams.map(team => team.getPublic());
		teams.sort((a, b) => {
			if (a.totalScore > b.totalScore) return -1;
			if (a.totalScore < b.totalScore) return 1;
			if (a.name < b.name) return -1;
			if (b.name > a.name) return 1;
			return 0;
		});

		res.json({
			success: !err,
			error: err ? err : null,
			scoreboard: teams
		});
	});
});

module.exports = { router };
