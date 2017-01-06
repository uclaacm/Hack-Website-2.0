const _ = require('underscore');
const uuid = require('node-uuid');
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
	attendence: { type: [Number] }
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

Team.methods.getPublic = function() {
	let team = _.pick(this, ['id', 'name', 'scores', 'attendence']);
	team.members = this.members.map(member => member.getPublic());
	team.totalScore = this.scores.reduce((a,b) => a.score + b.score, 0) +
					  this.attendence.reduce((a,b) => a + b, 0);
	return team;
};

module.exports = Team;
