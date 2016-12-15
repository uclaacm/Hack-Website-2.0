let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Project = require('./project');
let User = new Schema({
    id: { type: String, required: true, minLength: 4, unique: true },
	type: { type: String, enum: { 'facebook', 'google' }, required: true },
	profilePicture: { type: String },
	name: { type: String, required: true},
	lastSignIn: { type: Date }
});
