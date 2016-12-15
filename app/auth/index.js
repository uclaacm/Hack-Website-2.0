const express = require('express');
const config = require('../config');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let db = require('../db');
let router = express.Router();

let configAuth = (server) => {
	passport.use(new FacebookStrategy({
			clientID: config.facebook.appId,
			clientSecret: config.facebook.secret,
			callbackURL: config.host + '/auth/facebook/callback',
			profileFields: ['id', 'name', 'emails'],
			enableProof: true
		}, (accessToken, refreshToken, profile, callback) => {
			db.User.findById(profile.id, (err, user) => {
				if (err) throw err;
				if (!user) {
					user = new db.User({
						id: profile.id,
						accessToken: accessToken,
						name: profile.name.givenName + ' ' + profile.name.familyName,
						email: profile.emails[0].value,
						profilePicture: 'https://graph.facebook.com/v2.8/' + profile.id + '/picture'
					});
				}

				user.lastSignIn = new Date();
				user.accessToken = accessToken;
				user.save(err => {
					callback(err, user);
				});
			});
		}
	));
	
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		db.User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	server.use(passport.initialize());
	server.use(passport.session());
};

let authenticated = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/auth');
	}
};

/* 
 * This route handles showing the login form. If the user is logged in, go to the
 * hack school page. Otherwise, show the login form.
 */
router.get('/', (req, res) => {
	if (req.user)
		return res.redirect('/hackschool');
	res.render('auth/login');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/auth'
	}),
	(req, res) => {
		// success
		res.redirect('/hackschool');
	},
	(err, req, res, next) => {
		// failure - relogin
		res.redirect('/auth');
	}
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth');
});

module.exports = { router, authenticated, configAuth };
