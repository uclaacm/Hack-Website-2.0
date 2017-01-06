const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');

let server = express();

// Start the Ghost blog component
if (process.env.NODE_ENV === "production")
	app.ghost(server);

// Set the view engine to handlebars
server.set('view engine', 'hbs');

// Expose public resources
server.use(express.static('www/public'));

// Parse urlencoded and json POST data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Use sessions
server.use(app.session);

// Hack Data API
server.use('/api', app.api.router);

// Use authentication
app.auth.configAuth(server);
server.use('/auth', app.auth.router);

// Use authentication for the remaining routes
server.use(app.auth.authenticated);

// Hack School routes
server.use('/hackschool', app.hackschool.router);

// Expose private resources
server.use(express.static('www/private'));

// Create workers
if (cluster.isMaster) {
	console.log("creating", app.config.numCPUs);
	for (let i = 0; i < app.config.numCPUs; i++)
		cluster.fork();
	
	cluster.on('exit', (worker, code, signal) => {
		console.log("worker", worker.process.pid, "died");
		cluster.fork();
	});
} else {
	// Start the server on each worker
	server.listen(app.config.port, () => {
		console.log("started server on port", app.config.port, "PID:", process.pid);
	});
}

// For testing purposes
module.exports = server;
