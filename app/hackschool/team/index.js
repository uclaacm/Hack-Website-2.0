const express = require('express');
const async = require('async');
const db = require('../../db');
const log = require('../../logger');
let router = express.Router();

router.use((req, res, next) => {
	if (!req.user || !req.user.id) {
		log.info("[TEAMS] Unauthorized access at %s, from %s %s", new Date(), req.ip, req.headers['user-agent']);
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}
	
	next();
});

router.get('/', (req, res) => {
	if (!req.user.teamId)
		return res.json({ success: true, error: null, team: null });

	db.Team.findById(req.user.teamId, (err, team) => {
		if (err) log.error("[TEAMS] Database findById error for id %s: %s", req.user.teamId, err);
		res.status(err ? 500 : 200).json({
			success: !err,
			error: err ? err : null,
			team: err ? {} : team.getPublic()
		});
	});
});

router.post('/create', (req, res) => {
	if (req.user.teamId && req.user.teamId !== "")
		return res.json({ success: false, error: "You are already in a team." });
	if (!req.body.team || !req.body.team.name)
		return res.json({ success: false, error: "Malformed request." });
	if (!req.body.team.name.length)
		return res.json({ success: false, error: "Invalid team name." });
	
	db.Team.findByName(req.body.team.name, (err, team) => {
		if (err) {
			log.error("[TEAMS] Database findById error for name %s: %s", req.body.team.name, err);
			return res.status(500).json({ success: false, error: "Database error." });
		}

		if (team) return res.json({ success: false, error: "A team with that name already exists." });
		let newTeam = new db.Team({
			name: req.body.team.name,
			members: [req.user],
			scores: []
		});

		newTeam.save((err, updatedTeam) => {
			if (!err) {
				req.user.teamId = updatedTeam.id;
				req.user.save();
			} else {
				log.error("[TEAMS] Database save error: %s", err);
			}

			res.json({
				success: !err,
				error: err ? err : null,
				team: err ? {} : updatedTeam.getPublic()
			});
		});
	});
});

router.get('/leave', (req, res) => {
	if (!req.user.teamId)
		return res.json({ success: false, error: "You are not in a team." });

	db.Team.findById(req.user.teamId, (err, team) => {
		if (err) {
			log.error("[TEAMS] Database findById error for id %s: %s", req.user.teamId, err);
			return res.status(500).json({ success: false, error: "Database error." });
		}

		if (!team) return res.json({ success: false, error: "Could not find user team." });
		for (let i = 0; i < team.members.length; i++) {
			if (team.members[i].id === req.user.id) {
				team.members.splice(i--, 1);
			}
		}

		let teamAction = team.members.length === 0 ? team.remove : team.save;
		teamAction(err => {
			if (!err) {
				req.user.teamId = "";
				req.user.save();
			} else {
				log.error("[TEAM] Team save/delete error: %s", err);
			}

			res.json({
				success: !err,
				error: err ? err : null
			});
		});
	});
});

router.post('/join', (req, res) => {
	if (req.user.teamId)
		return res.json({ success: false, error: "You are already in a team." });
	if (!req.body.team || !req.body.team.id)
		return res.json({ success: false, error: "Malformed request." });
	
	db.Team.findById(req.body.team.id, (err, team) => {
		if (err) {
			log.error("[TEAM] Database findById error for id %s: %s", req.body.team.id, err);
			return res.status(500).json({ success: false, error: "Database error." });
		}

		if (!team)
			return res.json({ success: false, error: "No team with id '" + req.body.team.id + "' exists.", team: null });
		
		req.user.teamId = team.id;
		req.user.save();
		team.members.push(req.user);
		team.save((err, newTeam) => {
			if (err) log.error("[TEAMS] Team save error: %s", err);
			res.json({
				success: !err,
				error: err ? err : null,
				team: err ? {} : newTeam.getPublic()
			});
		});
	});
});

module.exports = { router };