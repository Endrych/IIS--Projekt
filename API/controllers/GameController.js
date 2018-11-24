const ResultCodes = require('../enums/ResultCodes');
const gameValidator = require('../validators/GameValidator');
const processError = require('../helpers/processError');
const selectAllGames = require('../helpers/GameHelpers/selectAllGames');
const getGameByKeyname = require('../helpers/GameHelpers/getGameByKeyname');
const getPublisherName = require('../helpers/PublisherHelpers/getPublisherName');
const getGameGenres = require('../helpers/GameGenreHelpers/getGameGenres');
const updateGame = require('../helpers/GameHelpers/updateGame');
const insertGame = require('../helpers/GameHelpers/insertGame');
const savePublisher = require('../helpers/PublisherHelpers/savePublisher');
const deleteGameGenres = require('../helpers/GameGenreHelpers/deleteGameGenres');
const saveGameGenres = require('../helpers/GameGenreHelpers/saveGameGenres');

module.exports = app => {
    const db = app.db;

    app.get('/games', (req, res) => {
        selectAllGames(db)
            .then(games => {
                res.send(games);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/game/:keyname', (req, res) => {
        var keyname = req.params.keyname;

        getGameByKeyname(keyname, db)
            .then(game => {
                if (!game) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                Promise.all([getPublisherName(game.PublisherId, db), getGameGenres(game.Id, db)])
                    .then(results => {
                        if (results[0]) {
                            game.Publisher = { Id: game.PublisherId, Name: results[0] };
                            delete game.PublisherId;
                        }
                        game.Genres = results[1];
                        res.send(game);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/game', (req, res) => {
        var body = req.body;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        if (!gameValidator.addGameValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        insertGame(req.body, db)
            .then(result => {
                res.send(result.toString());
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.put('/game/:keyname', (req, res) => {
        var body = req.body;
        var keyname = req.params.keyname;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        if (!gameValidator.updateValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        getGameByKeyname(keyname, db)
            .then(game => {
                if (!game) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                db.promiseBeginTransaction()
                    .then(() => {
                        savePublisher(body.Publisher, db)
                            .then(publisher => {
                                delete body.Publisher;
                                
                                if (publisher) {
                                    body.PublisherId = publisher;
                                }

                                deleteGameGenres(game.Id, db)
                                    .then(() => {
                                        var genres = body.Genres;
                                        delete body.Genres;

                                        Promise.all([
                                            saveGameGenres(game.Id, genres, db),
                                            updateGame(game.Id, body, db)
                                        ])
                                            .then(() => {
                                                db.commit();
                                                res.sendStatus(ResultCodes.OK);
                                            })
                                            .catch(err => {
                                                db.promiseRollback();
                                                processError(res, err);
                                                return;
                                            });
                                    })
                                    .catch(err => {
                                        db.promiseRollback();
                                        processError(res, err);
                                        return;
                                    });
                            })
                            .catch(err => {
                                db.promiseRollback();
                                processError(res, err);
                                return;
                            });
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.delete('/game/:id', (req, res) => {
        var id = req.params.id;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        updateGame(id, { Deleted: 1 }, db)
            .then(() => {
                res.sendStatus(ResultCodes.OK);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
