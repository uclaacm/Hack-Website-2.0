const bcrypt = require('bcrypt');
let Schema = require('mongoose').Schema;
let ObjectId = Schema.ObjectId;

let User = new Schema({
    id: { type: String, required: true, minLength: 4, unique: true },
    username: { type: String, required: true, minLength: 4, unique: true },
    password: { type: String, required: true, minLength: 4 },
    salt: { type: String, required: true, minLength: 4 },
    lastSignIn: { type: Date }
});

User.statics.findUser = function(username, password, callback) {
    return this.findOne({ username: username }, (err, user) => {
        if (err || !user)
            return callback(err || !user, user);
        bcrypt.hash(password, user.salt, (err, hash) => {
            const valid = !err && user.password === hash;
            return callback(!valid, valid ? user : null);
        });
    });
};

User.statics.findUserById = function(id, callback) {
    return this.findOne({ id: id }, (err, user) => {
        return callback(err || !user, user);
    });
};

User.methods.updateLastSignIn = function(callback) {
    this.lastSignIn = new Date();
    this.save(callback);
};

module.exports = User;