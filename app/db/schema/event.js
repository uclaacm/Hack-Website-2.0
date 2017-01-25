const uuid = require('node-uuid');
const _ = require('underscore');
const dbUtil = require('../util');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Event = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4()
	},
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true },
	},
	desc: { type: String },
	link: { type: String },
	title: { type: String, required: true },
	location: { type: String, required: true },
	category: { type: String, required: true },
	tagline: { type: String }
});

Event.pre('save', function(next) {
	if (this.date && this.date.start)
		this.date.start = new Date(this.date.start);
	if (this.date && this.date.end)
		this.date.end = new Date(this.date.end);
	next();
});

Event.statics.findById = function(id) {
	return this.findOne({ id }).exec();
};

Event.statics.sanitize = function(event, withId=true) {
	let pickProperties = ['date','desc','link','title','location','category','tagline'];
	if (withId) pickProperties.unshift('id');
	event = _.pick(event, pickProperties);
	if (event.date)
		event.date = _.pick(event.date, ['start', 'end']);
	return event;
};

Event.methods.update = function(obj) { dbUtil.update(obj, this);}
Event.methods.getPublic = function() {
	return this.constructor.sanitize(this);
};

module.exports = Event;
