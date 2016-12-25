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
	scores: { type: [{ projectNumber: Number, score: Number }] }
});

Team.statics.getAll = function(callback) {
	this.find({}, (err, teams) => {
		return callback(err, teams);
	});
};

Team.statics.findById = function(id, callback) {
	this.findOne({ id }, (err, team) => {
		return callback(err, team);
	});
};

Team.statics.findByName = function(name, callback) {
	this.findOne({ name }, (err, team) => {
		return callback(err, team);
	});
};

Team.methods.getPublic = function() {
	return {
		id: this.id,
		name: this.name,
		scores: this.scores,
		members: this.members.map(member => member.getPublic()),
		totalScore: this.scores.reduce((a,b) => a.score + b.score, 0)
	};
};

module.exports = Team;
