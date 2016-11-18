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

module.exports = Event;