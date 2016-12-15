let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Score = require('./score');
let User = new Schema({
    id: { type: String, required: true, minLength: 4, unique: true },
	state: { type: String, default: 'PENDING', enum: [ 'PENDING', 'ACTIVE', 'BLOCKED' ] },
	name: { type: String, required: true},
	profilePicture: { type: String },
	scores: { type: [Score] },
	accessToken: { type: String },
	lastSignIn: { type: Date }
});

User.statics.findById = function(id, callback) {
	this.findOne({ id }, (err, user) => {
		callback(err, user);
	});
};

module.exports = User;
