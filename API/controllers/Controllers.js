const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');
const publisherController = require('./PublisherController');
const articleController = require('./ArticleController');
const gameGenreController = require('./GameGenreController');
const teamController = require('./TeamController');
const inviteController = require('./InviteController');
const adminController = require('./AdminController');

module.exports = app => {
    userController(app);
    adminController(app);
    gameController(app);
    articleController(app);
    gameGenreController(app);
    publisherController(app);
    teamController(app);
    inviteController(app);
    errorController(app);
};
