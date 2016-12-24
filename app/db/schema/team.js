const uuid = require('node-uuid');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Score = require('./score');
let Team = new Schema({
    id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4() 
	},
	name: { type: String, required: true },
	memberIds: { type: [String], required: true },
	scores: { type: [Score] }
});

Team.statics.findById = function(id, callback) {
	this.findOne({ id }, (err, user) => {
		callback(err, user);
	});
};

Team.methods.getPublic = function() {
	/**
	 * TODO: implement public team object
	 * Return a publicized version of the team object
	 * It should have the total score, individual project scores, list of public member profiles, id, and name
	 */
};

module.exports = Team;
