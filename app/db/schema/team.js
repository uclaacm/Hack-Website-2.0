const _ = require('underscore');
const uuid = require('node-uuid');
const TOTAL_ATTENDANCE = 12;

let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let User = require('./user');
let Team = new Schema({
    id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4() 
	},
	name: { type: String, required: true },
	members: { type: [User], required: true },
	scores: { type: [{ sessionNumber: Number, score: Number }] },
	attendance: { type: [{ sessionNumber: Number, usersAttended: [String] }] }
});

Team.statics.getAll = function(callback) {
	this.find({}, callback); 
};

Team.statics.findById = function(id, callback) {
	this.findOne({ id }, callback); 
};

Team.statics.findByName = function(name, callback) {
	this.findOne({ name }, callback); 
};

Team.methods.addUser = function(user) {
	this.members.push(user);
	for (let i = 0; i < user.attendance.length; i++) 
		this.addAttended(user.attendance[i], user.id);
};

Team.methods.removeUser = function(user) {
	for (let i = 0; i < this.members.length; i++) {
		if (this.members[i].id === user.id)
			this.members.splice(i--, 1);
	}

	for (let i = 0; i < user.attendance.length; i++)
		this.removeAttended(user.attendance[i], user.id);
};

Team.methods.addAttended = function(sessionNumber, userId) {
	let sessionFound = false;
	for (let i = 0; i < this.attendance.length; i++) {
		if (this.attendance[i].sessionNumber === sessionNumber) {
			sessionFound = true;
			if (!this.attendance[i].usersAttended.includes(userId))
				this.attendance[i].usersAttended.push(userId);
		}
	}

	if (!sessionFound)
		this.attendance.push({ sessionNumber: sessionNumber, usersAttended: [userId] });
};

Team.methods.removeAttended = function(sessionNumber, userId) {
	for (let i = 0; i < this.attendance.length; i++) {
		if (this.attendance[i].sessionNumber === sessionNumber) {
			let index = this.attendance[i].usersAttended.indexOf(userId);
			if (index !== -1)
				this.attendance[i].usersAttended.splice(index, 1);
		}
	}
};

Team.methods.addOrUpdateScore = function(sessionNumber, score) {
	for (let i = 0; i < this.scores; i++) {
		if (this.scores[i].sessionNumber === sessionNumber) {
			this.scores[i].score = score;
			return;
		}
	}

	this.scores.push({ sessionNumber, score });
};

Team.methods.removeScore = function(sessionNumber) {
	for (let i = 0; i < this.scores; i++) {
		if (this.scores[i].sessionNumber === sessionNumber) {
			this.scores.splice(i--, 1);
		}
	}
};

Team.methods.getPublic = function(withMembers=true) {
	let team = _.pick(this, ['id', 'name', 'scores']);
	if (withMembers)
		team.members = this.members.map(member => member.getPublic());
	team.totalScore = this.scores.reduce((a,b) => a + b.score, 0) +
					  (TOTAL_ATTENDANCE / this.members.length) * this.attendance.reduce((a,b) => a + b.usersAttended.length, 0);
	return team;
};

module.exports = Team;
