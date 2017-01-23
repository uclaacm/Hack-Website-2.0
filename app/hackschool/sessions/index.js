const express = require('express');
const db = require('../../db');
const log = require('../../logger');
const cache = require('../../cache');
const config = require('../../config');
let router = express.Router();

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
		return res.json({ success: false, error: "You must be in a team to record your attendance" });

	db.Session.findSessionForDate(new Date(), (err, session) => {
		if (err) {
			log.error("[ATTENDANCE] Database error: %s", err);
			return res.json({ success: false, error: err });
		}

		if (!session) {
			log.error("[ATTENDANCE] No session found for date: %s", new Date());
			return res.json({ success: false, error: "You must sign in during the session" });
		}

		if (session.secret.toLowerCase() !== req.body.session.secret.toLowerCase())
			return res.json({ success: false, error: "Wrong attendance code" });

		db.Team.findById(req.user.teamId, (err, team) => {
			if (err) {
				log.error("[ATTENDANCE] Database error: %s", err);
				return res.json({ success: false, error: err });
			}

			if (!team) return res.json({ success: false, error: "Team not found" });
			if (req.user.attendance.includes(session.number))
				return res.json({ success: false, error: "You have already signed into this session" });

			req.user.attendance.push(session.number);
			team.addAttended(session.number, req.user.id);
			cache.set(config.cache.keys.teamsNeedUpdate, "1");

			req.user.save(err_u => {
				if (err) log.error("[ATTENDANCE] Database save error: %s", err_u);
				team.save(err_t => {
					if (err) log.error("[ATTENDANCE] Database save error: %s", err_t);
					res.json({
						success: !err_u && !err_t,
						error: err_u ? err_u : (err_t ? err_t : null),
						sessionNumber: !err_u && !err_t ? session.number : -1
					});
				});
			});
		});
	});
});

module.exports = { router };
