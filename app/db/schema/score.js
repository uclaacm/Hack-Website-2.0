let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Score = new Schema({
	projectNumber: { type: Number, required: true  },
	score: { type: Number, required: true }
});

module.exports = Score;
