const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
const Email = db.Email
let router = express.Router();

router.route('/:email?')
.all((req, res, next) =>{
	next();
})
.get((req, res, next) =>{
	Email.find(function(err, mails){
		if (err){
			res.send(err);
		}
		else {
		res.json({success: true, mailingList:mails});
	}
	});
})
.post((req, res, next) =>{
	let mail = new Email();
	mail.email = req.body.email;
	mail.name = req.body.name;
	mail.save(function(err){
		if(err){
			res.send(err);
		}
		else {
			res.json({success: true, email: mail.email, name: mail.name});
		}
		console.log("email created with " + mail.email + " name: " + mail.name);
	});
});

module.exports = { router };
