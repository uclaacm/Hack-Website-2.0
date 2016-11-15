const express = require('express');
const app = require('./app');
const port = process.env.port || 3000;

let server = express();
app.ghost(server);

server.listen(port, () => {
	console.log("started server on port", port);
});
