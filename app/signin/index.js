const querystring = require('querystring');
const express = require('express');
let router = express.Router();
let db = require('../db');

router.param('eventCode', (req, res, next, eventCode) => {
    if (!req.session.user)
        req.session.user = {};
    if (!req.session.user.event || req.session.user.event.code !== eventCode) {
        db.Event.findByCode(eventCode, (err, event) => {
            if (err)
                return res.render('signin/error', { error: "The event '" + eventCode + "' was not found" });
            req.session.user.event = event;
            next();
        });
    } else next();
    
});

router.get('/', (req, res) => {
    db.Event.findAllInProgress((err, events) => {
        res.render('signin/events', { events: err ? null : events });
    });
});

router.get('/:eventCode', (req, res) => {
    return res.render('signin/signin', { event: req.session.user.event });
});

router.get('/:eventCode/reset', (req, res) => {
    let eventCode = req.session.user.event.code;
    req.session.user = null;
    res.redirect(req.baseUrl + '/' + eventCode);
});

router.post('/:eventCode/signin', (req, res) => {
    let uid = (req.body.uid || "").replace(/[^\d]/g, ""); // remove non-digits
    if (!uid || uid.length !== 9)
        return res.redirect(req.baseUrl + '/' + req.session.user.event.code);

    db.Attendee.findByUID(uid, (err, attendee) => {
        req.session.user.uid = uid;
        req.session.user.attendee = attendee;
        if (err)
            return res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/moreinfo');
        
        attendee.addEvent(req.session.user.event);
        res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/success');
    });
});

router.get('/:eventCode/moreinfo', (req, res) => {
    if (!req.session.user || !req.session.user.uid)
        return res.redirect(req.baseUrl + '/' + req.session.user.event.code);
 
    db.Attendee.findByUID(req.session.user.uid, (err, attendee) => {
        req.session.user.attendee = attendee;
        if (err) {
            return res.render('signin/moreinfo', {
                uid: req.session.user.uid,
                event: req.session.user.event,
                attendee: req.session.user.errorData,
                error: {
                    error: req.session.user.error,
                    message: 'Some of the information you submitted was either invalid or incomplete.'
                }
            });
        }
        
        attendee.addEvent(req.session.user.event);
        res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/success');
    });
});

router.post('/:eventCode/adduser', (req, res) => {
    let newAttendeeData = {
        firstName: (req.body.firstName || "").trim(),
        lastName: (req.body.lastName || "").trim(),
        email: (req.body.email || "").trim(),
        major: (req.body.major || "").trim(),
        year: (req.body.year || "").trim(),
        uid: (req.body.uid || "").trim()
    };

    db.Attendee.findByUID(newAttendeeData.uid, (err, attendee) => {
        if (!err && attendee) {
            attendee.addEvent(req.session.user.event, (err, attendee, numAffected) => {
                req.session.user.attendee = attendee;
                res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/success');
            });
        } else {
            let newAttendee = new db.Attendee(newAttendeeData);
            newAttendee.addEvent(req.session.user.event, (err, attendee, numAffected) => {
                req.session.user.attendee = attendee;
                if (!err && attendee)
                    return res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/success');
                
                req.session.user.error = true;
                req.session.user.errorData = newAttendeeData;
                res.redirect(req.baseUrl + '/' + req.session.user.event.code + '/moreinfo');
            });
        }
    });
});

router.get('/:eventCode/success', (req, res) => {
    if (!req.session.user || !req.session.user.attendee)
        return res.redirect(req.baseUrl + '/' + req.session.user.event.code);

    res.render('signin/success', { 
        event: req.session.user.event,
        attendee: req.session.user.attendee
    });
    req.session.user = null;
});

module.exports = { router };