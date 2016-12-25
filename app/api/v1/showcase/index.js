const express = require('express');
const _ = require('underscore');
const crypto = require('../../../crypto');
const db = require('../../../db');
let router = express.Router();

router.route('/:projectId?')
.all((req, res, next) => {
	// Parse and store the requested project ID, token, and project information
	//   project ID is used to identify a project to read, modify, or delete (GET, PATCH, DELETE)
	//   token is used to authorize modification requests (POST, PATCH, DELETE)
	//   project is used to add or modify projects (POST, PATCH)
	req.projectId = req.params.projectId || null;
	req.validToken = req.body && req.body.token && crypto.verifyToken(req.body.token);
	req.project = req.body && req.body.project
	                     && typeof req.body.project === "object" ?
						     db.ShowcaseProject.sanitize(req.body.project, withId=false) : null;
	next();
})
.get((req, res, next) => {
	// GET request finds a project by the project ID, if given, otherwise get all projects
	let dbQuery = req.projectId ? { id: req.projectId } : {};

	db.ShowcaseProject.find(dbQuery).exec((err, results) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			error: err ? "Unable to find project(s) by ID: " + err : null,
			projects: err ? [] : results.map(project => {
				return db.ShowcaseProject.sanitize(project);
			})
		});
	});
})
.all((req, res, next) => {
	// ALL remaining routes require a valid token to proceed.
	if (!req.validToken)
		return res.status(401).json({ success: false, error: "A valid token is needed for this request."});
	next();
})
.post((req, res, next) => {
	// POST request adds a project
	//   If there is a project ID or there isn't a project to post, the request is malformed
	if (req.projectId || !req.project)
		return res.status(400).json({ success: false,
			 error: "Malformed request. Please visit the API documentation at http://github.com/uclaacm/Hack-Website-2.0."});

	// Create a new project with the given details (sanitized in .all)
	let newShowcaseProject = new db.ShowcaseProject(req.project);
	newShowcaseProject.save((err, updatedShowcaseProject) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			error: err ? "Unable to create project: " + err : null,
			project: err ? {} : db.ShowcaseProject.sanitize(updatedShowcaseProject)
		});
	});
})
.patch((req, res, next) => {
	// PATCH request updates an existing project
	//   If there isn't a project ID or there isn't a field description of what to update,
	//   then the request is malformed
	if (!req.projectId || !req.project)
		return res.status(400).json({ success: false,
			error: "Malformed request. Please visit the API documentation at http://github.com/uclaacm/Hack-Website-2.0."});

	// Find the project by ID and update the field based on the given details (sanitized above)
	db.ShowcaseProject.findById(req.projectId, (err, project) => {
		if (err || !project)
			return res.status(500).json({ success: false, error: "Unable to find project by ID: " + err});
		project.update(req.project);
		project.save((err, updatedShowcaseProject) => {
			res.status(err ? 500 : 200).json({
				success: !err,
				error: err ? "Unable to find project by ID: " + err : null,
				project: err ? {} : db.ShowcaseProject.sanitize(updatedShowcaseProject)
			});
		});
	});
})
.delete((req, res, next) => {
	// DELETE request deletes the indicated project (or all projects, if none specified)
	let dbQuery = req.projectId ? { id: req.projectId } : {};

	db.ShowcaseProject.remove(dbQuery, (err, opInfo) => {
		res.status(err ? 500 : 200).json({
			success: !err,
			error: err ? "Unable to delete project by ID: " + err : null,
			removed: opInfo && opInfo.result && opInfo.result.n ? opInfo.result.n : 0
		});
	});
});

module.exports = { router };
