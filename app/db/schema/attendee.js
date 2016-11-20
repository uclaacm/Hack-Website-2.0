let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Event = require('./event');
let Attendee = new Schema({
    firstName: { type: String, minLength: 1, required: true },
    lastName: { type: String, minLength: 1, required: true },
    email:  { type: String, minLength: 1, required: true },
    major: { type: String, minLength: 1, required: true },
    year: { type: String, minLength: 1, required: true },
    uid: { type: String, minLength: 1, required: true, unique: true },

    lastSignIn: Date,
    eventsAttended: [Event]
});

Attendee.statics.findByUID = function(uid, callback) {
    return this.findOne({ uid: uid }, (err, attendee) => {
        callback(err || !attendee, attendee);
    });
};

Attendee.statics.findByEventAttendedCode = function(eventCode, callback) {
    return this.find({ "eventsAttended.code " : eventCode }, (err, attendees) => {
        callback(err || attendees.length === 0, attendees);
    });
};

Attendee.methods.addEvent = function(event, callback) {
    if (!this.didAttendEvent(event))
        this.eventsAttended.push(event);
    this.lastSignIn = Date.now();
    this.save(callback);
};

Attendee.methods.didAttendEvent = function(event) {
    for (let i = 0; i < this.eventsAttended.length; i++)
        if (this.eventsAttended[i].code === event.code)
            return true;
    return false;
};

module.exports = Attendee;