const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
const Email = db.Email
let router = express.Router();

router.route('/:email?')
.all((req, res, next) => {
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.validToken = req.validToken || (req.query && req.query.token && crypto.verifyToken(req.query.token));
	//uncomment next line to make sure all requests need a token.
	// if (!req.validToken)
	// 	return res.status(401).json({ success: false, error: "Unauthorized" });
	next();
})
.get((req, res, next) => {
	if(!req.validToken){
		return res.status(401).json({success: false, error: "Unauthorized request, token rquired."});
	}
	Email.getAll((err, users) => {
		res.json({
			error: err ? err : null,
			success: !err,
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
			error: err ? err : null,
			success: !err,
			email: err ? {} : Email.sanitize(updatedMail)
		});
	});
});

module.exports = { router };
