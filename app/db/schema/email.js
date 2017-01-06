const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Email = new Schema({
	email: { type: String, required: true },
	name: { type: String }
});

Email.statics.getAll = function(callback) {
	this.find({}, callback);
};

Email.statics.sanitize = function(email) {
	return _.pick(email, ['email', 'name']);
};

module.exports = Email;
