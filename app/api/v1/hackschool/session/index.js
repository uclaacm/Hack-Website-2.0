const express = require('express');
const _ = require('underscore');
const crypto = require('../../../../crypto');
const db = require('../../../../db');
let router = express.Router();

router.route('/:sessionId?')
.all((req, res, next) => {
	// Parse and store the requested session ID, token, and session information
	//   session ID is used to identify a session to read, modify, or delete (GET, PATCH, DELETE)
	//   token is used to authorize modification requests (POST, PATCH, DELETE)
	//   session is used to add or modify sessions (POST, PATCH)
	req.sessionId = req.params.sessionId || null;
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.validToken = req.validToken || (req.query && req.query.token && crypto.verifyToken(req.query.token));
	req.sessionObj = req.body && req.body.session
	                     && typeof req.body.session === "object" ?
						     db.Session.sanitize(req.body.session, withId=false) : null;
	
	// ALL remaining routes require a valid token to proceed.
	if (!req.validToken)
		return res.status(401).json({ success: false, error: "A valid token is needed for this request." });
	next();
})
.get((req, res, next) => {
	// GET request finds a session by the session ID, if given, otherwise get all sessions
	let dbQuery = req.sessionId ? { id: req.sessionId } : {};

	db.Session.find(dbQuery).exec((err, results) => {
		res.json({
			success: !err,
			error: err ? err : null,
			numResults: results && results.length ? results.length : 0,
			sessions: err ? [] : results.map(session => db.Session.sanitize(session))
		});
	});
})
.post((req, res, next) => {
	// POST request adds a session
	//   If there is a session ID or there isn't a session to post, the request is malformed
	if (req.sessionId || !req.sessionObj)
		return res.status(400).json({ success: false, error: "Malformed request." });

	// Create a new session with the given details (sanitized in .all)
	let newSession = new db.Session(req.sessionObj);
	newSession.save((err, updatedSession) => {
		res.json({
			success: !err,
			error: err ? err : null,
			session: err ? {} : db.Session.sanitize(updatedSession)
		});
	});
})
.patch((req, res, next) => {
	// PATCH request updates an existing session
	//   If there isn't a session ID or there isn't a field description of what to update,
	//   then the request is malformed
	if (!req.sessionId || !req.sessionObj)
		return res.status(400).json({ success: false, error: "Malformed request." });

	// Find the session by ID and update the field based on the given details (sanitized above)
	db.Session.findById(req.sessionId, (err, session) => {
		if (err || !session)
			return res.json({ success: false, error: err });
		session.update(req.sessionObj);
		session.save((err, updatedSession) => {
			res.json({
				success: !err,
				error: err ? err : null,
				session: err ? {} : db.Session.sanitize(updatedSession)
			});
		});
	});
})
.delete((req, res, next) => {
	// DELETE request deletes the indicated session (or all sessions, if none specified)
	let dbQuery = req.sessionId ? { id: req.sessionId } : {};

	db.Session.remove(dbQuery, (err, opInfo) => {
		res.json({
			success: !err,
			error: err ? err : null,
			removed: opInfo && opInfo.result && opInfo.result.n ? opInfo.result.n : 0
		});
	});
});

module.exports = { router };
