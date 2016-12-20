const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database.uri);

let Project = mongoose.model('Project', require('./schema/project'));
let Event = mongoose.model('Event', require('./schema/event'));
let User = mongoose.model('User', require('./schema/user'));

module.exports = { Project, Event, User };
