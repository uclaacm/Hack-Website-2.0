const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT || 5000;

let server = express();

// Start the Ghost blog component
if (process.env.NODE_ENV === "production")
	app.ghost(server);

// Set the view engine to handlebars
server.set('view engine', 'hbs');
// Expose public resources
server.use(express.static('www/public'));
// Parse POST data as urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// Use sessions
server.use(app.session);

server.listen(port, () => {
	console.log("started server on port", port);
});
