const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');
const publisherController = require('./PublisherController');
const articleController = require('./ArticleController');

module.exports = app => {
	userController(app);
	gameController(app);
	articleController(app);
	publisherController(app);
	errorController(app);
};
