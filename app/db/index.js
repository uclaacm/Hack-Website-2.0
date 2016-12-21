const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database.uri);

let ShowcaseProject = mongoose.model('ShowcaseProject', require('./schema/showcaseProject'));
let Project = mongoose.model('Project', require('./schema/project'));
let Score = mongoose.model('Score', require('./schema/score'));
let Event = mongoose.model('Event', require('./schema/event'));
let User = mongoose.model('User', require('./schema/user'));

module.exports = { ShowcaseProject, Project, Score, Event, User };
