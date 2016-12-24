const express = require('express');
const db = require('../../db');
let router = express.Router();

router.get('/profile', (req, res) => {
	/**
	 * TODO: implement this.
	 * Returns a profile of the current user.
	 * Use the db.User.getPublic instance method 
	 */
});

module.exports = { router };
