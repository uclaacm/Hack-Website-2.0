const env = process.env.NODE_ENV || "development";
let config = { database: {} };

if (env === "production") {
    config.host = process.env.host;
    config.sessionSecret = process.env.sessionSecret;
    // config.database.host;
    // config.database.user;
    // config.database.port;
    // config.database.options;
} else {
    config.host = "http://localhost:5000";
    config.sessionSecret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
    config.database.host = "127.0.0.1";
    config.database.port = "27017";
    config.database.database = "acm-hack-db";
}

config.database.uri = "mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.database;
config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;