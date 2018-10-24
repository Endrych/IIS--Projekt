const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');
const publisherController = require('./PublisherController');
const articleController = require('./ArticleController');
const gameGenreController = require('./GameGenreController')

module.exports = app => {
	userController(app);
	gameController(app);
	articleController(app);
	gameGenreController(app);
	publisherController(app);
	errorController(app);
};
