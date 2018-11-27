const ResultCodes = require('../enums/ResultCodes');
const processError = require('../helpers/processError');
const TournamentValidator = require('../validators/TournamentValidator');
const insertTournament = require('../helpers/TournamentHelpers/insertTournament');

module.exports = app => {
    const db = app.db;    

    app.get('/tournament/:id', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        db.promiseQuery('SELECT * FROM Tournament WHERE Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }
                tournament = tournament[0];

                db.promiseQuery('Select UserId FROM tournament_user WHERE TournamentId = ?', id)
                    .then(users => {
                        tournament.Users = [];
                        users.forEach(element => {
                            tournament.Users.push(element.UserId);
                        });

                        res.send(tournament);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/tournament/:id/start', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        db.promiseQuery('SELECT * FROM Tournament WHERE Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                db.promiseQuery('UPDATE Tournament SET ? Where Id = ?', [{ State: 1, Round: 1 }, id])
                    .then(() => {
                        res.sendStatus(ResultCodes.OK);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.delete('/tournament/:id', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        db.promiseBeginTransaction()
            .then(() => {
                db.promiseQuery('Delete from tournament_user Where TournamentId = ?', id)
                    .then(() => {
                        db.promiseQuery('Delete from Tournament Where Id = ?', id)
                            .then(() => {
                                db.commit();
                                res.sendStatus(ResultCodes.OK);
                            })
                            .catch(err => {
                                db.promiseRollback();
                                processError(res, err);
                            });
                    })
                    .catch(err => {
                        db.promiseRollback();
                        processError(res, err);
                    });
            })
            .catch(err => {
                db.promiseRollback();
                processError(res, err);
            });
    });

    app.post('/tournament', (req, res) => {
        var body = req.body;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        if (!TournamentValidator.addTournamentValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        body.CreatedBy = req.user.Nickname;

        insertTournament(body, db)
            .then(teamId => {
                res.send(teamId.toString());
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/tournament/:id/unregister', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        db.promiseQuery('SELECT * FROM Tournament WHERE Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                if (tournament[0].State !== 0) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }

                db.promiseQuery('Delete from tournament_user Where TournamentId = ? AND UserId = ?', [
                    id,
                    req.user.Nickname
                ])
                    .then(() => {
                        res.sendStatus(ResultCodes.OK);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/tournament/:id/register', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        db.promiseQuery('SELECT * FROM Tournament WHERE Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                if (tournament[0].State !== 0) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }

                db.promiseQuery('Select * FROM tournament_user WHERE TournamentId = ?', id)
                    .then(results => {
                        var index = results.find(e => {
                            return e.UserId === req.user.Nickname;
                        });

                        if (index) {
                            res.sendStatus(ResultCodes.SEE_OTHER);
                            return;
                        }

                        db.promiseQuery('Insert into tournament_user SET ?', {
                            UserId: req.user.Nickname,
                            TournamentId: id
                        })
                            .then(() => {
                                res.sendStatus(ResultCodes.OK);
                            })
                            .catch(err => {
                                processError(res, err);
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
};
