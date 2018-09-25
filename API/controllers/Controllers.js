const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');

module.exports = app => {
    userController(app);
    gameController(app);
	errorController(app);
};
