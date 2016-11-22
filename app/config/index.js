const env = process.env.NODE_ENV || "development";
let config = { database: {}, session: {}, ghost: { database: {} } };

if (env === "production") {
    config.port = process.env.PORT;
    config.host = process.env.host;
    config.session.secret = process.env.SESSION_SECRET;
    config.database.uri = process.env.MONGODB_URI;
    config.session.uri = process.env.REDIS_URL;
    config.ghost.database.uri = process.env.DATABASE_URL;
} else {
    config.post = 5000;
    config.host = "http://localhost:" + config.port;
    config.session.secret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
    config.database.uri = "mongodb://127.0.0.1:27017/acm-hack-db";
    config.ghost.database.uri = "postgres://localhost/acm-hack-dev-db";
}

config.ghost.url = config.host + "/blog";
config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;