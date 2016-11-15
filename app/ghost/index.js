const ghost = require('./core');
const errors = require('./core/server/errors');

module.exports = (server) => {
	console.log("called");
	require('./core/server/utils/startup-check').check();
	ghost().then(ghostApp => {
		server.use(ghostApp.config.paths.subdir, ghostApp.rootApp);
	}).catch(err => {
		errors.logErrorAndExit(err, err.context, err.help);
	});
};

