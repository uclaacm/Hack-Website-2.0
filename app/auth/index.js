const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connectEnsureLogin = require('connect-ensure-login');
const express = require('express');
let router = express.Router();
let db = require('../db');

// Set up passport authentication
let configure = server => {
    passport.use(new LocalStrategy((username, password, done) => {
        db.User.findUser(username, password, (err, user) => {
            if (err) return done(null);
            if (!user) return done(null, false);
            console.log(user);
            return done(null, user);
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.User.findUserById(id, (err, user) => {
            if (err)
                return done(err);
            done(err, user);
        });
    });

    server.use(passport.initialize());
    server.use(passport.session());
};

// Middleware to require login
let requireAuth = connectEnsureLogin.ensureLoggedIn('/login');

// Create a user
let createUser = (username, password, callback) => {
    let self = this;
    if (!username || username.length < 4 || !password || password.length < 4)
        return callback(true);

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            let newUser = new db.User({
                id: uuid.v4(),
                username: username,
                password: hash,
                salt: salt
            });
            newUser.save(callback);
        });
    });
};

// Handle login and logout routes
router.get('/login', (req, res) => {
    if (req.user)
        res.redirect('/admin');
    else
        res.render('auth/login'); 
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login?failure'
    }), (req, res) => { 
        res.redirect('/admin');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = { router, configure, requireAuth };