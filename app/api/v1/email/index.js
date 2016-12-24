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
		res.json(mails);
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
		res.json({success: "true"});
		console.log("email created with " + mail.email);
	});
});

module.exports = { router };
