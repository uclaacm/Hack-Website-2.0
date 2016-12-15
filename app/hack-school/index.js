const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
	res.send("<h1>Hack School</h1>");
});

module.exports = { router };
