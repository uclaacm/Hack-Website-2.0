const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
let router = express.Router();

router.route('/:eventId?')
.all((req, res, next) => {
	// Parse and store the requested event ID, token, and event information
	//   event ID is used to identify an event to read, modify, or delete (GET, PATCH, DELETE)
	//   token is used to authorize modification requests (POST, PATCH, DELETE)
	//   event is used to add or modify events (POST, PATCH)
	req.eventId = req.params.eventId || null;
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.event = req.body && req.body.event
	                     && typeof req.body.event === "object" ? 
						     db.Event.sanitize(req.body.event, withId=false) : null;
	next();
})
.get((req, res, next) => {
	// GET request finds an event by the event ID, if given, otherwise get all events
	let dbQuery = req.eventId ? { id: req.eventId } : {};

	db.Event.find(dbQuery).exec((err, results) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			events: err ? [] : results.map(event => db.Event.sanitize(event))
		});
	});
})
.all((req, res, next) => {
	// ALL remaining routes require a valid token to proceed.
	if (!req.validToken)
		return res.status(401).json({ success: false });
	next();
})
.post((req, res, next) => {
	// POST request adds and event
	//   If there is an event ID or there isn't an event to post, the request is malformed
	if (req.eventId || !req.event)
		return res.status(400).json({ success: false });
	
	// Create a new event with the given details (sanitized in .all)
	let newEvent = new db.Event(req.event);
	newEvent.save((err, updatedEvent) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			event: err ? {} : db.Event.sanitize(updatedEvent)
		});
	});
})
.patch((req, res, next) => {
	// PATCH request updates an existing event
	//   If there isn't an event ID or there isn't a field description of what to update,
	//   then the request is malformed
	if (!req.eventId || !req.event)
		return res.status(400).json({ success: false });
	
	// Find the event by ID and update the field based on the given details (sanitized in .all)
	db.Event.findById(req.eventId, (err, event) => {
		if (err || !event)
			return res.status(500).json({ success: false });
		event.update(req.event);
		event.save((err, updatedEvent) => {
			res.status(err ? 500 : 200).json({
				success: !err,
				event: err ? {} : db.Event.sanitize(updatedEvent)
			});
		});
	});
})
.delete((req, res, next) => {
	// DELETE request deletes the indicated event (or all events, if none specified)
	let dbQuery = req.eventId ? { id: req.eventId } : {};

	db.Event.remove(dbQuery, (err, opInfo) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			removed: opInfo && opInfo.result && opInfo.result.n ? opInfo.result.n : 0
		});
	});
});

module.exports = { router };
