const uuid = require('node-uuid');
const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Session = new Schema({
	id: {
		type: String,
		required: true,
		unique: true,
		default: () => uuid.v4()
	},
	number: { type: Number, required: true, unique: true },
	secret: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	desc: { type: String, required: true },
	image: { type: String, required: true },
	date: {
		start: { type: Date, required: true },
		end: { type: Date, required: true },
	},
	blogPostLink: { type: String },
	project: {
		points: { type: Number },
		videoLink: { type: String },
		slidesLink: { type: String },
		submissionLink: { type: String }
	}
}, { minimize: false });

Session.statics.getAll = function(callback) {
	this.find({}, callback);
};

Session.statics.findById = function(id, callback) {
	this.findOne({ id }, callback);
};

Session.statics.getSessionForDate = function(date, callback) {
	this.findOne({ "date.start" : { $lt : date }, "date.end" : { $gt : date } }, callback);
};

Session.statics.sanitize = function(session, withId=true) {
	let pickProperties = ['number','name','secret','date','desc','image','blogPostLink','project']; 
	if (withId) pickProperties.unshift('id');
	session = _.pick(session, pickProperties);
	if (session.date)
		session.date = _.pick(session.date, ['start', 'end']);
	if (session.project)
		session.project = _.pick(session.project, ['points','slidesLink','videoLink','submissionLink']);
	return session;
};

Session.methods.getPublic = function() {
	let obj = this.constructor.sanitize(this);
	delete obj.secret;
	return obj;
};

Session.methods.update = function(session) {
	if (!session) return;
	let applyDelta = (delta, target) => {
		for (let key in delta) {
			if (delta[key].constructor === Object)
				applyDelta(delta[key], target[key])
			else
				target[key] = delta[key]
		}
	};

	applyDelta(session, this);
};

module.exports = Session;
