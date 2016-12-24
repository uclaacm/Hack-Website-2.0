const uuid = require('node-uuid');
const _ = require('underscore');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Email = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
});

module.exports = Email;
