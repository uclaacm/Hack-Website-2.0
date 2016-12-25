const uuid = require('node-uuid');
const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Project = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4()
	},
	number: { type: Number, required: true, unique: true },
	points: { type: Number, required: true },
	name: { type: String, required: true },
	desc: { type: String, required: true },
	image: { type: String, required: true },
	videoLink: { type: String },
	slidesLink: { type: String, required: true  },
	blogPostLink: { type: String },
	submissionLink: { type: String },
});

Project.statics.getAll = function(callback) {
	this.find({}, (err, projects) => {
		return callback(err, projects);
	});
};

Project.methods.getPublic = function() {
	return _.pick(this, ['id','number','points','name','desc','image','videoLink','slidesLink','blogPostLink','submissionLink']);
};

module.exports = Project;
