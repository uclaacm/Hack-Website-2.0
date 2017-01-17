const express = require('express');
const config = require('../config');
const log = require('../logger');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth2').Strategy;
let db = require('../db');
let router = express.Router();

let configAuth = (server) => {
	// Load the Facebook Passport Strategy
	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientId,
		clientSecret: config.facebook.secret,
		callbackURL: config.host + '/auth/facebook/callback',
		profileFields: ['id', 'name', 'emails'],
		enableProof: true
	}, (accessToken, refreshToken, profile, callback) => {
		// Find the use by facebook profile id
		// If found, updated the access token and continue authentication
		// If not found, create the user and continue authentication
		log.debug("[AUTH] Received profile from Facebook: %j", profile);
		db.User.findByProfileId(profile.id, (err, user) => {
			if (err) {
				log.error("[AUTH] Database error: %s", err);
				return callack(err, null);
			}

			if (!user) {
				log.info("[AUTH] User for ID %s not found, creating new user...", profile.id);
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
				if (err)
					log.error("[AUTH] Database save error: %s", err);
				callback(err, user);
			});
		});
	}));

	// Load the Google Passport Strategy
	passport.use(new GoogleStrategy({
		clientID: config.google.clientId,
		clientSecret: config.google.secret,
		callbackURL: config.host + '/auth/google/callback'
	}, (accessToken, refreshToken, profile, callback) => {
		// Find the use by google profile id
		// If found, updated the access token and continue authentication
		// If not found, create the user and continue authentication
		log.debug("[AUTH] Received profile from Gacebook: %j", profile);
		db.User.findByProfileId(profile.id, (err, user) => {
			if (err) {
				log.error("[AUTH] Database error: %s", err);
				return callack(err, null);
			}

			if (!user) {
				log.info("[AUTH] User for ID %s not found, creating new user...", profile.id);
				let photoAvailable = profile.photos && profile.photos.length > 0 && profile.photos[0].value;
				let photoUrl = photoAvailable ? profile.photos[0].value.split("?sz=")[0] : '';
				user = new db.User({
					profileId: profile.id,
					accessToken: accessToken,
					email: profile.emails && profile.emails.length > 0 && profile.emails[0].value ? profile.emails[0].value : null,
					name: profile.name.givenName + ' ' + profile.name.familyName,
					profilePicture: {
						small: photoAvailable ? photoUrl + "?sz=100" : '',
						medium: photoAvailable ? photoUrl + "?sz=250" : '',
						large: photoAvailable ? photoUrl + "?sz=500" : '' 
					}
				});
			}

			user.lastSignIn = new Date();
			user.accessToken = accessToken;
			user.save(err => {
				if (err)
					log.error("[AUTH] Database save error: %s", err);
				callback(err, user);
			});
		});
		
	}));

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
router.get('/', (req, res, next) => {
	if (req.user) {
		log.debug("[AUTH] User %s already logged in. Redirecting to Dashboard...", req.user.id);
		return res.redirect('/hackschool');
	}

	res.render('auth/login');
});

// Route to visit to initiate a Facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

// Route to visit to initiate a Google authentication
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

// Callback for Facebook authentication (Facebook gives us public profile and token)
router.get('/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/auth'
	}),
	(req, res) => {
		// success
		log.debug("[AUTH] Successfully logged in via Facebook. Redirecting to Dashboard...");
		res.redirect('/hackschool');
	},
	(err, req, res, next) => {
		// failure - relogin
		log.error("[AUTH] Error logging in. %j, %s, %s, %s", err, req.body, req.params, req.query);
		res.redirect('/auth');
	}
);

router.get('/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth'
	}),
	(req, res) => {
		// success
		log.debug("[AUTH] Successfully logged in via Google. Redirecting to Dashboard...");
		res.redirect('/hackschool');
	},
	(err, req, res, next) => {
		// failure - relogin
		log.error("[AUTH] Error logging in. %j, %s, %s, %s", err, req.body, req.params, req.query);
		res.redirect('/auth');
	}
);

// Logout route
router.get('/logout', (req, res) => {
	if (!req.user)
		return res.redirect('/auth');

	log.debug("[AUTH] User %s logged out", req.user.id);
	req.logout();
	res.render('auth/logout');
});

module.exports = { router, authenticated, configAuth };
