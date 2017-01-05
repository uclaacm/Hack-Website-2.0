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
	return {
		id: this.id,
		name: this.name,
		scores: this.scores,
		members: this.members.map(member => member.getPublic()),
		attendence: this.attendence,
		totalScore: this.scores.reduce((a,b) => a.score + b.score, 0) +
					this.attendence.reduce((a,b) => a + b, 0)
	};
};

module.exports = Team;
