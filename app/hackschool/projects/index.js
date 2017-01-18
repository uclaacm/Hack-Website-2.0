const express = require('express');
const db = require('../../db');
let router = express.Router();

router.get('/', (req, res) => {
	db.Project.getAll((err, projects) => {
		res.json({
			success: !err,
			error: err ? err : null,
			projects: err ? null : projects.map(project => project.getPublic())
		});
	});
});

module.exports = { router };
