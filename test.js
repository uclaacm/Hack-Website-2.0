const db = require('./app/db');
const should = require('should');
const assert = require('assert');

describe('testing DB query for all eventss', function(){
  it('should return a status code of 200', function(){
    db.Event.find({}).exec((err, results) => {
      const status = err ? 500 : 200
      assert(status,200)
    });
  });
});
