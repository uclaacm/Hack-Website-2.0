const request = require('request');
const express = require('express');
const _ = require('underscore');
const config = require('../../../config');
const crypto = require('../../../crypto');
const log = require('../../../logger');
const db = require('../../../db');
const Email = db.Email
let router = express.Router();

router.route('/')
.all((req, res, next) => {
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.validToken = req.validToken || (req.query && req.query.token && crypto.verifyToken(req.query.token));
	//uncomment the below code to require a token for all email related requests
	//if (!req.validToken)
	//	return res.status(401).json({ success: false, error: "Unauthorized" });
	next();
})
.get((req, res, next) => {
	if(!req.validToken){
		return res.status(401).json({success: false, error: "Unauthorized request, token required."});
	}
	Email.getAll((err, users) => {
		res.json({
			success: !err,
			error: err ? err : null,
			numResults: users && users.length ? users.length : 0,
			mailingList: err ? [] : users.map(user => Email.sanitize(user))
		});
	});
})
.post((req, res, next) =>{
	if (!req.body.email || !(typeof req.body.email === typeof {}))
		return res.status(400).json({ success: false, error: "Invalid request format" });

	let newMail = new Email(req.body.email);
	newMail.save((err, updatedMail) => {
		res.json({
			success: !err,
			error: err ? err : null,
			email: err ? {} : Email.sanitize(updatedMail)
		});
	});
});

// Subscribe to the mailchimp
router.post('/subscribe', (req, res) => {
	if (!req.body.email)
		return res.json({ success: false, error: "Malformed request." });
	if (!/[^@]+@[^@]+\.[^@]+/.test(req.body.email))
		return res.json({ success: false, error: "Invalid email address." });

	log.debug("Received email '%s' to subscribe to email list", req.body.email);
	request({
		method: "POST",
		url: "https://" + config.mailchimp.instance + ".api.mailchimp.com/3.0/lists/" + config.mailchimp.hackListId + "/members",
		headers: {
			"Content-type": "application/json;charset=utf-8",
			"Authorization": "Basic " + new Buffer("any:" + config.mailchimp.apiKey).toString("base64")
		},
		json: {
			"email_address": req.body.email,
			"status": "subscribed"
		}
	}, (error, response, body) => {
		if (error) {
			log.error("Error subscribing email '%s' with error %s", req.body.email, error);
			res.json({ success: false, error: "Internal server error." });
		} else {
			let succeeded = response.statusCode < 300 || (response.statusCode === 400 && response.body.title === "Member Exists");
			log.debug("Subscribing email '%s' received statusCode %d, message %s [OK: %d]", req.body.email, response.statusCode, body.title, succeeded);
			res.json({ success: succeeded, error: succeeded ? null : body.title });
		}
	});
});

module.exports = { router };
