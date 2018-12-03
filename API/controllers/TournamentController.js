const ResultCodes = require('../enums/ResultCodes');
const processError = require('../helpers/processError');
const TournamentValidator = require('../validators/TournamentValidator');
const insertTournament = require('../helpers/TournamentHelpers/insertTournament');
const startTournament = require('../helpers/TournamentHelpers/startTournament');
const continueTournament = require('../helpers/TournamentHelpers/continueTournament');

module.exports = app => {
    const db = app.db;

    app.get('/tournaments', (req, res) => {
        db.promiseQuery(
            'SELECT tournament.Id, tournament.Name, State, tournament.Game, game.Name as GameName, game.Keyname as GameKeyname, Created FROM tournament LEFT JOIN game ON tournament.game = game.id order by Created DESC'
        )
            .then(tournaments => {
                tournaments.forEach(element => {
                    element.Game = { Id: element.Game, Name: element.GameName, Keyname: element.GameKeyname };
                    delete element.GameName;
                    delete element.GameKeyname;
                });

                res.send(tournaments);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/tournament/:id', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        Promise.all([
            db.promiseQuery(
                'SELECT tournament.Id, tournament.Name, tournament.Description, State, Created, CreatedBy,Round, Winner, tournament.Game,game.Keyname as GameKeyname, game.Name as GameName FROM tournament LEFT JOIN game ON tournament.game = game.id WHERE tournament.Id = ?',
                id
            ),
            db.promiseQuery('Select UserId FROM tournament_user WHERE TournamentId = ?', id),
            db.promiseQuery(
                'SELECT * FROM tournament_match JOIN tmatch ON tournament_match.tmatch = tmatch.id WHERE Tournament = ?',
                id
            )
        ])

            .then(results => {
                var tournament = results[0];

                if (tournament.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }

                tournament = tournament[0];
                tournament.Game = { Id: tournament.Game, Name: tournament.GameName, Keyname: tournament.GameKeyname };
                delete tournament.GameName;
                delete tournament.GameKeyname;
                var users = results[1];
                tournament.Users = [];

                users.forEach(element => {
                    tournament.Users.push(element.UserId);
                });

                var matches = results[2];
                var resMatch = {};

                matches.forEach(element => {
                    if (!resMatch[element.Round]) {
                        resMatch[element.Round] = [];
                    }

                    resMatch[element.Round].push({
                        Id: element.Id,
                        User1: element.User1,
                        User2: element.User2,
                        Score1: element.Score1,
                        Score2: element.Score2
                    });
                });

                tournament.Matches = resMatch;
                res.send(tournament);
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

        startTournament(id, db)
            .then(() => {
                res.sendStatus(ResultCodes.OK);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/tournament/:id/continue', (req, res) => {
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

        continueTournament(id, db)
            .then(result => {
                res.status(ResultCodes.OK).send(result);
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
                        db.promiseQuery('Delete from tournament Where Id = ? AND State = 0', id)
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

        db.promiseQuery('Select Id From game Where Id = ?', body.Game)
            .then(game => {
                if (game.length === 0) {
                    res.sendStatus(ResultCodes.BAD_REQUEST);
                    return;
                }

                insertTournament(body, db)
                    .then(teamId => {
                        res.send(teamId.toString());
                    })
                    .catch(err => {
                        processError(res, err);
                    });
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

        db.promiseQuery('SELECT * FROM tournament WHERE Id = ?', id)
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

        db.promiseQuery('SELECT * FROM tournament WHERE Id = ?', id)
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
