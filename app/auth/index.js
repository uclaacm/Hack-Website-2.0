const express = require('express');
const config = require('../config');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let db = require('../db');
let router = express.Router();

let configAuth = (server) => {
	// Load the Facebook Passport Strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.appId,
			clientSecret: config.facebook.secret,
			callbackURL: config.host + '/auth/facebook/callback',
			profileFields: ['id', 'name', 'emails'],
			enableProof: true
		}, (accessToken, refreshToken, profile, callback) => {
			// Find the use by facebook profile id
			// If found, updated the access token and continue authentication
			// If not found, create the user and continue authentication
			db.User.findByProfileId(profile.id, (err, user) => {
				if (err) 
					return callack(err, null);
				if (!user) {
					user = new db.User({
						profileId: profile.id,
						accessToken: accessToken,
						email: profile.emails && profile.emails.length > 0 && profile.emails[0].value ? profile.emails[0].value : null,
						name: profile.name.givenName + ' ' + profile.name.familyName,
						profilePicture: {
							small: 'https://graph.facebook.com/' + profile.id + '/picture?width=100',
							medium: 'https://graph.facebook.com/' + profile.id + '/picture?width=250',
							large: 'https://graph.facebook.com/' + profile.id + '/picture?width=500'
						}
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
	
	// Serializing users: a user is represented by their ID
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Deserializing users: lookup a user by id (how we serialized) and find the 
	//   rest of the user info
	passport.deserializeUser((id, done) => {
		db.User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	// Let the express server use the passport.
	server.use(passport.initialize());
	server.use(passport.session());
};

// middleware to determine whether a user is authenticated
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

// Route to visit to initiate a Facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Callback for Facebook authentication (Facebook gives us public profile and token)
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

// Logout route
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/auth');
});

module.exports = { router, authenticated, configAuth };
