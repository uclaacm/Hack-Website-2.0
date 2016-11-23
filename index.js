const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT || 5000;

let server = express();

// Start the Ghost blog component
app.ghost(server);

// Set the view engine to handlebars
server.set('view engine', 'hbs');
// Expose public resources
server.use(express.static('www/public'));
// Parse POST data as urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// Use sessions
server.use(app.session);

// Routes for different public components
server.use('/signin', app.signIn.router);

// Use authentication for private components
app.auth.configure(server);
server.use('/', app.auth.router);

// Routes for different private components
server.use('/admin', app.auth.requireAuth, app.admin.router);

server.listen(port, () => {
	console.log("started server on port", port);
});
