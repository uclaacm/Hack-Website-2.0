const env = process.env.NODE_ENV || "development";
let config = { database: {} };

if (env === "production") {
    config.host = process.env.host;
    config.sessionSecret = process.env.sessionSecret;
    config.database.uri = "mongodb://acm-hack:bXm-BT4-gfb-FaW@ds159237.mlab.com:59237/heroku_554lzv52";
} else {
    config.host = "http://localhost:5000";
    config.sessionSecret = "77ea260f6918c0d8c3b6c35514d3b1a4fc69f01adbf7d2412611de97c3f0f2dc";
    config.database.uri = "mongodb://127.0.0.1:27017/acm-hack-db";
}

config.isProduction = env === "production";
config.isDevelopment = !config.isProduction;

module.exports = config;