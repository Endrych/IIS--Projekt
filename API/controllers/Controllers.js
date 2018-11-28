const errorController = require('./ErrorController');
const gameController = require('./GameController');
const userController = require('./UserController');
const publisherController = require('./PublisherController');
const articleController = require('./ArticleController');
const gameGenreController = require('./GameGenreController');
const teamController = require('./TeamController');
const inviteController = require('./InviteController');
const adminController = require('./AdminController');
const authenticationController = require('./AuthenticationController');
const tournamentController = require('./TournamentController');
const matchController = require('./MatchController');
const searchController = require('./SearchController');

module.exports = app => {
    authenticationController(app);
    userController(app);
    adminController(app);
    gameController(app);
    articleController(app);
    gameGenreController(app);
    publisherController(app);
    teamController(app);
    tournamentController(app);
    matchController(app);
    inviteController(app);
    searchController(app);
    errorController(app);
};
