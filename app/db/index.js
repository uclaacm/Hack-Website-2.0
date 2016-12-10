const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database.uri);

/**
 * The schema for each ACM event. Used for sign ins and statistics
 */
// let Event = mongoose.model('Event', require('./schema/event'));

/**
 * The schema for each ACM event attendee. Used for sign ins and statistics
 */
// let Attendee = mongoose.model('Attendee', require('./schema/attendee'));

/**
 * The schema for an ACM admin user
 */
//let User = mongoose.model('User', require('./schema/user'));

//module.exports = { Attendee, Event, User };
module.exports = {};
