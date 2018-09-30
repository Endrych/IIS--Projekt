const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');
const publisherController = require('./PublisherController');

module.exports = app => {
	userController(app);
	gameController(app);
	publisherController(app);
	errorController(app);
};
