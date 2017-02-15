const log = require('../logger');
let update = function(from, to) {
	if (!from) return;
	let applyDelta = (delta, target) => {
		for (let key in delta) {
			if (delta[key].constructor === Object)
				applyDelta(delta[key], target[key])
			else {
				if (delta[key].constructor === String && delta[key].trim() === "-" ||
					delta[key].constructor === Array && delta[key].length === 1 && delta[key][0].trim() === '-') {
					log.debug("Deleting field %s from object", key);
					target[key] = undefined;
				} else 
					target[key] = delta[key]
			}
		}
	};
	
	applyDelta(from, to);
};

module.exports = { update }; 
