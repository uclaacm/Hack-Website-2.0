const uuid = require('node-uuid');
const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Event = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v1()
	},
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true },
	},
	desc: { type: String },
	title: { type: String, required: true },
	location: { type: String, required: true },
	category: { type: String, required: true },
	tagline: { type: String }
});

Event.statics.findById = function(id, callback) {
	this.findOne({ id }, (err, event) => {
		callback(err, event);
	});
};

Event.statics.sanitize = function(event, withId=true) {
	let pickProperties = ['date','desc','title','location','category','tagline'];
	if (withId) pickProperties.unshift('id');
	event = _.pick(event, pickProperties);
	if (event.date)
		event.date = _.pick(event.date, ['start', 'end']);
	return event;
};

Event.methods.update = function(event) {
	if (!event) return;
	let applyDelta = (delta, target) => {
		for (let key in delta) {
			if (typeof delta[key] === typeof {})
				applyDelta(delta[key], target[key])
			else
				target[key] = delta[key]
		}
	};
	
	applyDelta(event, this);
};

module.exports = Event;
