const session = require('express-session');
const config = require('../config');

module.exports = session({
    resave: true,
    secret: config.sessionSecret,
    cookie: { secure: config.isProduction },
    saveUninitialized: true
});