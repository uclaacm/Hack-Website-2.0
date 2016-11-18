let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let Event = require('./event');
let User = new Schema({
    firstName: { type: String, minLength: 1, required: true },
    lastName: { type: String, minLength: 1, required: true },
    email:  { type: String, minLength: 1, required: true },
    major: { type: String, minLength: 1, required: true },
    year: { type: String, minLength: 1, required: true },
    uid: { type: String, minLength: 1, required: true, unique: true },

    lastSignIn: Date,
    eventsAttended: [Event]
});

User.statics.findByUID = function(uid, callback) {
    return this.findOne({ uid: uid }, (err, user) => {
        callback(err || !user, user);
    });
};

User.statics.findByEventAttendedCode = function(eventCode, callback) {
    return this.find({ "eventsAttended.code " : eventCode }, (err, users) => {
        callback(err || users.length === 0, users);
    });
};

User.methods.addEvent = function(event, callback) {
    // check if event exists
    if (!this.didAttendEvent(event))
        this.eventsAttended.push(event);
    this.lastSignIn = Date.now();
    this.save(callback);
};

User.methods.didAttendEvent = function(event) {
    // determine whether user attended event
    for (let i = 0; i < this.eventsAttended.length; i++)
        if (this.eventsAttended[i].code === event.code)
            return true;
    return false;
};

module.exports = User;