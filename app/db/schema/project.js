let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Project = new Schema({
	number: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	shortDesc: { type: String },
	desc: { type: String },
	image: { type: String },
	submissionLink: { type: String }
});