const _ = require('underscore');
const uuid = require('node-uuid');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let User = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4()
	},
    profileId: {
		type: String,
		required: true, 
		unique: true
	},
	state: {
		type: String,
		default: 'PENDING',
		enum: [ 'PENDING', 'ACTIVE', 'BLOCKED' ]
	},
	name: { type: String, required: true},
	email: { type: String },
	profilePicture: {
		small: { type: String },
		medium: { type: String },
		large: { type: String }
	},
	accessToken: { type: String },
	lastSignIn: { type: Date },
	teamId: { type: String },
	attendance: [Number]
}, { minimize: false });

User.statics.findById = function(id) {
	return this.findOne({ id }).exec();
};

User.statics.findByProfileId = function(profileId) {
	return this.findOne({ profileId }).exec();
};

User.methods.getPublic = function() {
	return _.pick(this, ['id', 'name', 'profilePicture', 'attendance']);
};

module.exports = User;
