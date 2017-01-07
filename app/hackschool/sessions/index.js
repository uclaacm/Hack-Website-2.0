const express = require('express');
const db = require('../../db');
const log = require('../../logger');
let router = express.Router();

router.use((req, res, next) => {
	if (!req.user || !req.user.id) {
		log.info("[SESSIONS] Unauthorized access at %s, %s %s", new Date(), req.ip, req.headers['user-agent']);
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}

	next();
});

router.get('/', (req, res) => {
	db.Session.getAll((err, sessions) => {
		if (err) log.error("[SESSIONS] Database error: %s", err);
		res.json({
			success: !err,
			error: err ? err : null,
			sessions: err ? null : sessions.map(session => session.getPublic())
		});
	});
});

router.post('/attend', (req, res) => {
	if (!req.body || !req.body.session || !req.body.session.secret) 
		return res.json({ success: false, error: "Malformed reqest" });
	if (!req.user.teamId)
		return res.json({ success: false, error: "You must be in a team to record your attendence" });

	db.Session.findSessionForDate(new Date(), (err, session) => {
		if (err) {
			log.error("[ATTENDANCE] Database error: %s", err);
			return res.json({ success: false, error: err });
		}

		if (!session) {
			log.error("[ATTENDANCE] No session found for date: %s", new Date());
			return res.json({ success: false, error: "No session found to sign in to" });
		}

		if (session.secret !== req.body.session.secret)
			return res.json({ success: false, error: "Wrong attendence code" });

		db.Team.findById(req.user.teamId, (err, team) => {
			if (err) {
				log.error("[ATTENDANCE] Database error: %s", err);
				return res.json({ success: false, error: err });
			}

			if (!team) return res.json({ success: false, error: "Team not found" });
			if (team.attendence.includes(session.number))
				return res.json({ success: false, error: "Your team has already signed into this session" });

			team.attendence.push(session.number);
			team.attendence.save(err => {
				if (err) log.error("[ATTENDANCE] Database save error: %s", err);
				res.json({
					success: !err,
					error: err ? err : null
				});
			});
		});
	});
});

module.exports = { router };
