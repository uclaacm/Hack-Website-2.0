const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    console.log("??");
    res.render('admin/index');
});

module.exports = { router };