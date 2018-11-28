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
const matchTournament = require('./MatchController');

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
    matchTournament(app);
    inviteController(app);
    errorController(app);
};
