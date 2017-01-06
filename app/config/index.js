const env = process.env.NODE_ENV || "development";
let config = { database: {}, session: {}, ghost: { database: {} }, facebook: {} };

if (env === "production") {
    config.port = process.env.PORT;
    config.host = process.env.HOST;
	config.numCPUs = process.env.WEB_CONCURRENCY;
	config.session.secret = process.env.SESSION_SECRET;
    config.database.uri = process.env.MONGODB_URI;
    config.session.uri = process.env.REDIS_URL;
    config.ghost.database.uri = process.env.DATABASE_URL;
	config.facebook.appId = process.env.FACEBOOK_APP_ID;
	config.facebook.secret = process.env.FACEBOOK_APP_SECRET;
} else {
    config.port = 5000;
    config.host = "http://localhost:" + config.port;
	config.numCPUs = require('os').cpus().length;
    config.session.secret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
    config.database.uri = "mongodb://127.0.0.1:27017/acm-hack-db";
    config.ghost.database.uri = "postgres://localhost/acm-hack-dev-db";
	config.facebook.appId = "236380866788670";
	config.facebook.secret = "72afc70ce3cb5f2ba13115b2516450ed";
//	config.facebook.appId = "229762920785401";
//	config.facebook.secret = "a6e3b6dee5c7424fd0605a6679052739";
}

config.apiSecret = "a076ef2e85154871eb365ecb4942bfd5";
config.ghost.url = config.host + "/blog";
config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;
