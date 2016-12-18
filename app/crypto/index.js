const crypto = require('crypto');
const config = require('../config');

let getToken = () => {
	let time = Date.now()+''; 
	let header = "";
	for (let ch of time)
		header += ch + "0123456789abcdef"[Math.floor(Math.random() * 16)];

	return header + crypto.createHash('sha256').update(time + config.apiSecret).digest('hex');
};

let verifyToken = (token) => {
	let length = (Date.now()+'').length * 2;
	let hash = token.substring(length);
	let time = "";;
	for (let i = 0; i < length; i += 2)
		time += token[i];

	// in production, tokens should not be older than 20 seconds
	if (config.isProduction)
		if (Date.now() - parseInt(time) > 20000)
			return false;

	return hash === crypto.createHash('sha256').update(time + config.apiSecret).digest('hex');
};

module.exports = { getToken, verifyToken };
