const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
let router = express.Router();

//TODO:
//add support of filtering based upon category
//add error fields to response, that is empty if the request was successful or gives a description of the error(s) if it was not.

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
			error: err ? "Request failed: " + err : null,
			numResults: events && events.length ? events.length : 0,
			events: err ? [] : results.map(event => {
				return db.Event.sanitize(event);
			})
		});
	});
})
.all((req, res, next) => {
	// ALL remaining routes require a valid token to proceed.
	if (!req.validToken)
		return res.status(401).json({ success: false, error: "A valid token is needed for this request."});
	next();
})
.post((req, res, next) => {
	// POST request adds and event
	//   If there is an event ID or there isn't an event to post, the request is malformed
	if (req.eventId || !req.event)
		return res.status(400).json({ success: false,
			error: "Malformed request. Please see the API docs at http://github.com/uclaacm/Hack-Website-2.0 for API details."});

	// Create a new event with the given details (sanitized in .all)
	let newEvent = new db.Event(req.event);
	newEvent.save((err, updatedEvent) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			error: err ? "Request failed: " + err : null,
			event: err ? {} : db.Event.sanitize(updatedEvent)
		});
	});
})
.patch((req, res, next) => {
	// PATCH request updates an existing event
	//   If there isn't an event ID or there isn't a field description of what to update,
	//   then the request is malformed
	if (!req.eventId || !req.event)
		return res.status(400).json({ success: false, error: "Malformed request. Please see the docs at http://github.com/uclaacm/Hack-Website-2.0 for API details."});

	// Find the event by ID and update the field based on the given details (sanitized in .all)
	db.Event.findById(req.eventId, (err, event) => {
		if (err || !event)
			return res.status(500).json({ success: false, error: "Unable to find event by ID: " + err});
		event.update(req.event);
		event.save((err, updatedEvent) => {
			res.status(err ? 500 : 200).json({
				success: !err,
				error: err ? "Unable to find event by ID: " + err : null,
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
			error: err ? "Unable to delete requested event(s): " + err : null,
			removed: opInfo && opInfo.result && opInfo.result.n ? opInfo.result.n : 0
		});
	});
});

module.exports = { router };
