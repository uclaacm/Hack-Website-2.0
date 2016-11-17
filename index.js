const express = require('express');
const app = require('./app');
const port = process.env.PORT || 5000;

let server = express();

// start the ghost server
server.use(express.static('www/public'));
server.set('view engine', 'hbs');
server.use('/signin', app.signIn.Router);
app.ghost(server);

server.listen(port, () => {
	console.log("started server on port", port);
});
