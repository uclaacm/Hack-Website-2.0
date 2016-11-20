let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Event = new Schema({
    organization: String,
    title: String,
    code: String,
    date: {
        start: Date,
        end: Date
    }
});

Event.statics.findByCode = function (code, callback) {
    return this.findOne({ code: code }, (err, event) => {
        callback(err || !event, event);
    });
};

Event.statics.findAllInProgress = function(callback) {
    let now = new Date();
    return this.find({ "date.start" : { $lt : now }, "date.end" : { $gt : now }}, (err, events) => {
        callback(err || events.length === 0, events);
    });
};

module.exports = Event;