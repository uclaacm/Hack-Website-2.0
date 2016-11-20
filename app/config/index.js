const env = process.env.NODE_ENV || "development";
let config = { database: {} };

if (env === "production") {
    config.host = process.env.host;
    config.sessionSecret = process.env.SESSION_SECRET;
    config.database.uri = process.env.MONGODB_URI;
} else {
    config.host = "http://localhost:5000";
    config.sessionSecret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
    config.database.uri = "mongodb://127.0.0.1:27017/acm-hack-db";
}

config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;