const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const port = process.env.PORT || 5000;

let server = express();

server.set('view engine', 'hbs');
server.use(express.static('www/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(app.session);
server.use('/signin', app.signIn.Router);

// start the ghost server
// app.ghost(server);

server.listen(port, () => {
	console.log("started server on port", port);
});
