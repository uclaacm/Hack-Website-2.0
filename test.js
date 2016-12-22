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


// .get((req, res, next) => {
// 	// GET request finds an event by the event ID, if given, otherwise get all events
// 	let dbQuery = req.eventId ? { id: req.eventId } : {};
//
// 	db.Event.find(dbQuery).exec((err, results) => {
// 		res.status(err ? 500 : 200).json({
// 			success: !err,
// 			events: err ? [] : results.map(event => {
// 				return db.Event.sanitize(event);
// 			})
// 		});
// 	});
// })
