const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.database.uri);

let Project = mongoose.model('Project', require('./schema/project'));
let User = mongoose.model('User', require('./schema/user'));

module.exports = { Project, User };
