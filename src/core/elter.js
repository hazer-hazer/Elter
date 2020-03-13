const moduleController = require('./moduleController');

const run = params => {
	moduleController.callMiddlewares();
};

module.exports = {
	use: moduleController.use,
	run
}