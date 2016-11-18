const querystring = require('querystring');
const express = require('express');
let db = require('../db');
let router = express.Router();

router.param('eventCode', (req, res, next, eventCode) => {
    db.Event.findByCode(eventCode, (err, event) => {
        if (err)
            return res.render('signin/error', { error: "The event '" + eventCode + "' was not found" });
        req.user = { event };
        next();
    });
});

router.get('/:eventCode', (req, res) => {
    return res.render('signin/index', { event: req.user.event });
});

router.post('/:eventCode/signin', (req, res) => {
    let uid = (req.body.uid || "").replace(/[^\d]/g, ""); // remove non-digits
    if (!uid || uid.length !== 9)
        return res.redirect(req.baseUrl + '/' + req.user.event.code);

    db.User.findByUID(uid, (err, user) => {
        if (err)
            return res.redirect(req.baseUrl + '/' + req.user.event.code + '/moreinfo/' + uid);
        
        user.addEvent(req.user.event);
        res.redirect(req.baseUrl + '/' + req.user.event.code + '/success/' + uid);
    });
});

router.get('/:eventCode/moreinfo/:uid', (req, res) => {
    let uid = (req.params.uid || "").replace(/[^\d]/g, ""); // remove non-digits
    if (!uid || uid.length !== 9)
        return res.redirect(req.baseUrl + '/' + req.user.event.code);

    let uriData = req.query.d || null;
    if (uriData)
        uriData = querystring.parse(Buffer.from(uriData, 'base64').toString('ascii'));
    
    db.User.findByUID(uid, (err, user) => {
        if (err)
            return res.render('signin/moreinfo', { event: req.user.event, uid , user: uriData });
        
        user.addEvent(req.user.event);
        res.redirect(req.baseUrl + '/' + req.user.event.code + '/success/' + uid);
    });
});

router.post('/:eventCode/adduser', (req, res) => {
    let newUserData = {
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        email: req.body.email || "",
        major: req.body.major || "",
        year: req.body.year || "",
        uid: req.body.uid || ""
    };

    
    db.User.findByUID(newUserData.uid, (err, user) => {
        if (!err && user) {
            user.addEvent(req.user.event, (err, user, numAffected) => {
                res.redirect(req.baseUrl + '/' + req.user.event.cod + '/success/' + user.uid);
            });
        } else {
            let newUser = new db.User(newUserData);
            newUser.addEvent(req.user.event, (err, user, numAffected) => {
                if (!err && user)
                    return res.redirect(req.baseUrl + '/' + req.user.event.code);
                
                const uriData = Buffer.from(querystring.stringify(newUserData)).toString('base64');
                res.redirect(req.baseUrl + '/' + req.user.event.code + '/moreinfo/' + newUserData.uid + '?d=' + uriData);
            });
        }
    });
});

router.get('/:eventCode/success/:uid', (req, res) => {
    let uid = (req.params.uid || "").replace(/[^\d]/g, ""); // remove non-digits
    if (!uid || uid.length !== 9)
        return res.redirect(req.baseUrl + '/' + req.user.event.code);

    db.User.findByUID(uid, (err, user) => {
        if (err || !user.attendedEvent(req.user.event))
            return res.redirect(req.baseUrl + '/' + req.user.event.code);
        res.render('signin/signedin', { event: req.user.event, user });
    });
});

module.exports = {
    Router: router
};