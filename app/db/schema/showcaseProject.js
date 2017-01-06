const uuid = require('node-uuid');
const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let ShowcaseProject = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4()
	},
	date: {
		type: Date,
		required: true,
		default: () => new Date()
	},
	desc: { type: String },
	image: { type: String },
	link: { type: String, required: true },
	title: { type: String, required: true },
	technologies: { type: [String] },
	contributors: { type: [String], required: true }
});

ShowcaseProject.statics.findById = function(id, callback) {
	this.findOne({ id }, callback);
};

ShowcaseProject.statics.sanitize = function(event, withId=true) {
	let pickProperties = ['date','desc','image','link','title','technologies','contributors'];
	if (withId) pickProperties.unshift('id');
	event = _.pick(event, pickProperties);
	return event;
};

ShowcaseProject.methods.update = function(event) {
	if (!event) return;
	let applyDelta = (delta, target) => {
		for (let key in delta) {
			if (delta[key].constructor === Object)
				applyDelta(delta[key], target[key])
			 else
				target[key] = delta[key];
		}
	};
	
	applyDelta(event, this);
};

module.exports = ShowcaseProject;
