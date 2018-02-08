const env = process.env.NODE_ENV || "development";
const keys = require('./keys');
let config = {
	database: {},
	session: {},
	ghost: { 
		database: {}
	},
	cache: {},
	facebook: {},
	google: {},
	logging: {},
	mailchimp: {},
	mail: {},
	aws: {
		s3: {}
	}
};

if (env === "production") {
	config.port = process.env.PORT;
	config.host = process.env.HOST;
	config.numCPUs = process.env.WEB_CONCURRENCY;

	config.session.secret = process.env.SESSION_SECRET;
	config.session.uri = process.env.REDIS_URL;

	config.database.uri = process.env.MONGODB_URI;
	config.ghost.database.uri = process.env.DATABASE_URL;

	config.cache.uri = process.env.REDIS_URL;
	config.cache.keys = keys.cache;

	config.facebook.clientId = process.env.FACEBOOK_APP_ID;
	config.facebook.secret = process.env.FACEBOOK_APP_SECRET;

	config.google.clientId = process.env.GOOGLE_CLIENT_ID;
	config.google.secret = process.env.GOOGLE_CLIENT_SECRET;

	config.logging.level = "debug";
	
	config.mailchimp.apiKey = process.env.MAILCHIMP_API_KEY;
	config.mailchimp.hackListId = process.env.MAILCHIMP_HACK_LIST_ID;
	config.mail.email = process.env.GMAIL_USERNAME;
	config.mail.password = process.env.GMAIL_PASSWORD;
	
	config.aws.s3.accessKey = process.env.AWS_S3_ACCESS_KEY;
	config.aws.s3.secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
} else {
	config.port = 5000;
	config.host = "http://0.0.0.0:" + config.port;
	config.numCPUs = require('os').cpus().length;
	
	config.session.secret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
	config.session.uri = `redis://${process.env.REDIS_URI || '127.0.0.1'}/0`;
	
	config.database.uri = `mongodb://${process.env.MONGODB_URI || '127.0.0.1:27017'}/${process.env.MONGODB_NAME || 'acm-hack-db'}`;
	config.ghost.database.uri = "postgres://localhost/acm-hack-dev-db";
	
	config.cache.uri = config.session.uri;
	config.cache.keys = keys.cache;

	config.facebook.clientId = "242266409533449";
	config.facebook.secret = "1c577fb0e3e6516310e76a24ae568d32";
	
	config.google.clientId = "217648124428-o8g0nmshdcgheccu7itideofoaeve51a.apps.googleusercontent.com"; 
	config.google.secret = "40RDwgivSyLPN-HIT7PqvKne"; 
	
	config.logging.level = "silly";
	
	config.mailchimp.apiKey = "06efc2be170824225c414a3d7fd47076-us14";
	config.mailchimp.hackListId = "28bbeb9f5a";
	
	config.aws.s3.accessKey = ""; 
	config.aws.s3.secretAccessKey = "";
}

config.apiSecret = "a076ef2e85154871eb365ecb4942bfd5";
config.ghost.url = config.host + "/blog";
config.mailchimp.instance = config.mailchimp.apiKey.split("-")[1];
config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;
