const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
const Email = db.Email
let router = express.Router();

router.route('/:email?')
.all((req, res, next) => {
	// TODO: add token verification?
	next();
})
.get((req, res, next) => {
	Email.getAll((err, users) => {
		res.json({
			error: err ? err : null,
			success: !err,
			numResults: users && users.length ? users.length : 0,
			mailingList: users 
		});
	});
})
.post((req, res, next) =>{
	if (!req.body.email || !(typeof req.body.email === typeof {}))
		return res.status(400).json({ success: false, error: "Invalid request format" });

	let newMail = new Email(req.body.email);
	newMail.save((err, updatedMail) => {
		res.status(err ? 500 : 200).json({
			error: err ? err : null,
			success: !err,
			numResults: err ? 0 : 1,
			email: err ? {} : Email.sanitize(updatedMail)
		});
	});
});

module.exports = { router };
