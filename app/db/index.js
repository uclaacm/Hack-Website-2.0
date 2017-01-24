const mongoose = require('mongoose');
const config = require('../config');

// Use bluebird promises
mongoose.Promise = require('bluebird');
mongoose.connect(config.database.uri);

let ShowcaseProject = mongoose.model('ShowcaseProject', require('./schema/showcaseProject'));
let Session = mongoose.model('Session', require('./schema/session'));
let Event = mongoose.model('Event', require('./schema/event'));
let Email = mongoose.model('Email', require('./schema/email'));
let User = mongoose.model('User', require('./schema/user'));
let Team = mongoose.model('Team', require('./schema/team'));

module.exports = { ShowcaseProject, Session, Event, Email, User, Team };
