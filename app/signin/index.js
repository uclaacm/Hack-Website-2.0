const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('signin/index');
});

module.exports = {
    Router: router
};