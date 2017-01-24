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
	screenshots: { type: [String] },
	link: { type: String, required: true },
	title: { type: String, required: true },
	sourceLink: { type: String },
	technologies: { type: [String] },
	contributors: { type: [String], required: true }
});

ShowcaseProject.statics.findById = function(id) {
	return this.findOne({ id }).exec();
};

ShowcaseProject.statics.sanitize = function(event, withId=true) {
	let pickProperties = ['date','desc','image','screenshots','link','sourceLink','title','technologies','contributors'];
	if (withId) pickProperties.unshift('id');
	return _.pick(event, pickProperties);
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

ShowcaseProject.methods.getPublic = function() {
	return this.constructor.sanitize(this);
}

module.exports = ShowcaseProject;
