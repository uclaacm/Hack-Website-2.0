const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	/**
	 * TODO: implement user's team information
	 * Should return a team object, null if no team
	 * If user is in a team, then the team id, name, and member profiles, total score, individual project scores
	 */
});

router.post('/create', (req, res) => {
	/**
	 * TODO: implement creating a new team
	 * If the user is already in a team, do nothing, return an error
	 * If the user is not in a team:
	 *   Create a new team with given req.body.name, add the current user to it
	 *   Set current user's team ID to this team
	 *   Return the newly created team
	 */
});

router.get('/leave', (req, res) => {
	/**
	 * TODO: implement leaving the team
	 * If the user is not in a team, do nothing, return an error
	 * Remove the user from the team
	 *   If the team has no members now, delete the team
	 * Set the user's team ID to null
	 */
});

router.post('/join', (req, res) => {
	/**
	 * TODO: implement joining a team
	 * If the user is already in team, do nothing, return an error
	 * If the team id in req.body.teamId does not exist, do nothing, return an error
	 * Add this user to the the team given by req.body.teamId
	 * Set this user's teamId to req.body.teamId
	 */
});

module.exports = { router };
