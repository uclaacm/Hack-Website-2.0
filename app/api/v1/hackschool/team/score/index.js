const express = require('express');
const _ = require('underscore');
const crypto = require('../../../../../crypto');
const db = require('../../../../../db');
const log = require('../../../../../logger');
let router = express.Router();

router.route('/:teamId?')
.all((req, res, next) => {
	// Parse and store the requested team ID, token, and score information
	//   team ID is used to identify a team to read, modify, or delete (GET, PATCH, DELETE)
	//   token is used to authorize modification requests (POST, PATCH, DELETE)
	//   score is used to add or modify scores (POST, PATCH, DELETE)
	req.teamId = req.params.teamId || null;
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.validToken = req.validToken || (req.query && req.query.token && crypto.verifyToken(req.query.token));
	req.scoreObj = req.body && req.body.score ? req.body.score : null;
	
	// ALL remaining routes require a valid token to proceed.
	if (!req.validToken)
		return res.status(401).json({ success: false, error: "A valid token is needed for this request." });
	next();
})
.get((req, res, next) => {
	// GET request finds a team by the team ID, if given, otherwise get all teams 
	let dbQuery = req.teamId ? { id: req.teamId } : {};

	db.Team.find(dbQuery).exec((err, results) => {
		res.json({
			success: !err,
			error: err ? err : null,
			numResults: results && results.length ? results.length : 0,
			teams: err ? [] : results.map(team => team.getPublic(withMembers=false))
		});
	});
})
.post((req, res, next) => {
	// POST request adds a score
	//   If there is a team ID or there isn't a score to post, the request is malformed
	if (req.teamId || !req.scoreObj || !req.scoreObj.teamId || !req.scoreObj.score || !req.scoreObj.sessionNumber)
		return res.status(400).json({ success: false, error: "Malformed request." });

	// Create a new session with the given details (sanitized in .all)
	db.Team.findById(req.scoreObj.teamId, (err, team) => {
		if (err) {
			log.error("[SCORE API] Database error: %s", err);
			return res.status(500).json({ success: false, error: err });
		}
		
		if (!team) return res.json({ success: false, error: "No such team" });

		team.addOrUpdateScore(req.scoreObj.sessionNumber, req.scoreObj.score, req.scoreObj.daysLate);
		team.save((err, updatedTeam) => {
			req.json({
				success: !err,
				error: err ? err : null
			});
		});
	});
})
.delete((req, res, next) => {
	// DELETE request deletes specified team's session score, or all scores
	if (!req.teamId || !req.scoreObj.sessionNumber)
		return res.json({ success: false, error: "Malformed request" });
		
	db.Team.findById(req.teamId, (err, team) => {
		if (err) {
			log.error("[SCORE API] Database error: %s", err);
			return res.status(500).json({ success: false, error: err });
		}
		
		if (!team) return res.json({ success: false, error: "No such team" });
		
		team.removeScore(req.scoreObj.sessionNumber)
		team.save((err, updatedTeam) => {
			res.json({
				success: !err,
				error: err ? err : null
			});
		});
	});
});

module.exports = { router };
