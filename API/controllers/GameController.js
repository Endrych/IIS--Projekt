const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const gameValidator = require('../validators/GameValidator');
const processError = require('../helpers/processError');
const selectAllGames = require('../helpers/GameHelpers/selectAllGames');
const getGameByKeyname = require('../helpers/GameHelpers/getGameByKeyname');
const getPublisherName = require('../helpers/PublisherHelpers/getPublisherName');
const getGameGenres = require('../helpers/GameGenreHelpers/getGameGenres');

module.exports = app => {
    const db = app.db;

    function saveGameToDb(body, genres) {
        return new Promise((resolve, reject) => {
            body.Deleted = 0;
            db.query('INSERT INTO GAME SET ?', body, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    saveGameGenreGameTableData(result.insertId, genres)
                        .then(result1 => {
                            resolve();
                        })
                        .catch(error => {
                            throw error;
                        });
                }
            });
        });
    }

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

    app.post('/games', (req, res) => {
        var body = req.body;
        var genres = body.Genres;
        delete body.Genres;

        if (gameValidator.addGameValidation(body)) {
            db.beginTransaction(err => {
                if (err) {
                    throw err;
                }
                db.query('SELECT Id FROM Game WHERE ? AND Deleted = 0', { Keyname: body.Keyname }, (err, result) => {
                    if (result.length === 0) {
                        savePublisherToDb(body.Publisher)
                            .then(result => {
                                delete body.Publisher;

                                if (result) {
                                    body.PublisherId = result;
                                }

                                saveGameToDb(body, genres)
                                    .then(result => {
                                        db.commit();
                                        res.send(new Result(ResultCodes.OK, body.Keyname));
                                    })
                                    .catch(error => {
                                        db.rollback();
                                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                                db.rollback();
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            });
                    } else {
                        db.rollback();
                        res.send(new Result(ResultCodes.SEE_OTHER));
                    }
                });
            });
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }
    });

    app.put('/games/:keyname', (req, res) => {
        var body = req.body;
        var id = req.params.keyname;
        if (gameValidator.addGameValidation(body)) {
            db.query('SELECT Id FROM GAME WHERE Keyname = ? AND DELETED = ?', [id, 0], (err, result0) => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                } else {
                    if (result0.length === 0) {
                        res.send(new Result(ResultCodes.NO_CONTENT));
                    } else {
                        var gameId = result0[0].Id;
                        db.query(
                            'SELECT Keyname FROM GAME WHERE Keyname = ? AND Deleted = ? AND Id <> ?',
                            [body.Keyname, 0, gameId],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                } else {
                                    if (result.length === 0) {
                                        savePublisherToDb(body.Publisher)
                                            .then(result => {
                                                delete body.Publisher;
                                                if (result) {
                                                    body.PublisherId = result;
                                                }
                                                saveGameGenreGameTableData(gameId, body.Genres)
                                                    .then(result1 => {
                                                        delete body.Genres;
                                                        db.query(
                                                            'UPDATE GAME SET ? WHERE Keyname = ? AND Deleted = ?',
                                                            [body, id, 0],
                                                            (err, result2) => {
                                                                if (err) {
                                                                    console.log(err);
                                                                    res.send(
                                                                        new Result(ResultCodes.INTERNAL_SERVER_ERROR)
                                                                    );
                                                                }
                                                                res.send(new Result(ResultCodes.OK, body.Keyname));
                                                            }
                                                        );
                                                    })
                                                    .catch(error =>
                                                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR))
                                                    );
                                            })
                                            .catch(err => {
                                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                            });
                                    } else {
                                        res.send(new Result(ResultCodes.SEE_OTHER));
                                    }
                                }
                            }
                        );
                    }
                }
            });
        } else {
            res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
        }
    });

    app.delete('/games/:id', (req, res) => {
        var id = req.params.id;
        db.query('UPDATE GAME SET Deleted = ? WHERE Keyname = ? AND Deleted = ?', [1, id, 0], (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            }
            res.send(new Result(ResultCodes.OK));
        });
    });
};
