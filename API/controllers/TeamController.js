const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const teamValidator = require('../validators/TeamValidator');
const moment = require('moment');

module.exports = app => {
    app.get('/teams', (req, res) => {
        db.query('SELECT Id, Name, Logo FROM TEAM WHERE Deleted = 0', (err, teams) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            } else {
                res.send(teams);
            }
        });
    });

    app.get('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }
        db.query('SELECT * FROM TEAM WHERE Deleted = 0 AND Id = ?', id, (err, team) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            } else {
                if (team.length > 0) {
                    team = team[0];
                    delete team.Deleted;
                    res.send(team);
                } else {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                }
            }
        });
    });

    app.post('/team/leave', (req, res) => {
        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        var teamId = parseInt(req.user.Team);

        if (!isNaN(teamId)) {
            db.query('SELECT * FROM Team Where Id = ? AND Deleted = 0', teamId, (err, team) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    return;
                }

                if (team.length > 0) {
                    team = team[0];
                    if (team.Owner === req.user.Nickname) {
                        db.query('SELECT Nickname FROM User WHERE Team = ?', teamId, (err, users) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                return;
                            }
                            if (users.length === 1) {
                                db.beginTransaction(err => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                        return;
                                    }
                                    db.query(
                                        'UPDATE User SET Team = ? WHERE Nickname = ?',
                                        [null, req.user.Nickname],
                                        (err, _) => {
                                            if (err) {
                                                console.log(err);
                                                db.rollback(err => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                                });
                                                return;
                                            }
                                            db.query(
                                                'UPDATE Team SET Deleted = ? WHERE Id = ? AND Deleted = ?',
                                                [1, teamId, 0],
                                                (err, _) => {
                                                    if (err) {
                                                        console.log(err);
                                                        db.rollback(err => {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                                        });
                                                        return;
                                                    }
                                                    db.commit(err => {
                                                        if (err) {
                                                            console.log(err);
                                                            db.rollback(err => {
                                                                if (err) {
                                                                    console.log(err);
                                                                }
                                                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                                            });
                                                            return;
                                                        }
                                                        res.sendStatus(ResultCodes.OK);
                                                    });
                                                }
                                            );
                                        }
                                    );
                                });
                            } else {
                                res.sendStatus(ResultCodes.FORBIDDEN);
                            }
                        });
                    } else {
                        db.query('UPDATE User SET Team = ? WHERE Nickname = ?', [null, req.user.Nickname], (err, _) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                return;
                            }
                            res.sendStatus(ResultCodes.OK);
                        });
                    }
                } else {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                }
            });
        } else {
            res.sendStatus(ResultCodes.BAD_REQUEST);
        }
    });

    app.post('/team', (req, res) => {
        var body = req.body;

        if (req.user) {
            if (!req.user.Team) {
                if (teamValidator.addTeamValidation(body)) {
                    body.Created = moment().toISOString();
                    body.Deleted = 0;
                    body.Owner = req.user.Nickname;

                    db.beginTransaction(err => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        } else {
                            db.query('INSERT INTO TEAM SET ?', body, (err, team) => {
                                if (err) {
                                    console.log(err);
                                    db.rollback(err => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                    });
                                }
                                db.query(
                                    'UPDATE User SET ? WHERE Nickname = ?',
                                    [{ Team: team.insertId }, body.Owner, 0],
                                    err => {
                                        if (err) {
                                            console.log(err);
                                            db.rollback(err => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                            });
                                        } else {
                                            db.commit(err => {
                                                if (err) {
                                                    console.log(err);
                                                    db.rollback(err => {
                                                        if (err) {
                                                            console.log(err);
                                                        }
                                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                                    });
                                                } else {
                                                    res.send(team.insertId.toString());
                                                }
                                            });
                                        }
                                    }
                                );
                            });
                        }
                    });
                } else {
                    res.sendStatus(ResultCodes.BAD_REQUEST);
                }
            } else {
                res.sendStatus(ResultCodes.SEE_OTHER);
            }
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });

    app.put('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        var body = req.body;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        db.query('SELECT Id, Owner FROM Team WHERE Id = ? AND Deleted = 0', id, (err, team) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }

            if (team.length > 0) {
                if (team.Owner !== req.user.Nickname) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }

                if (!teamValidator.addTeamValidation(body)) {
                    res.sendStatus(ResultCodes.BAD_REQUEST);
                    return;
                }
                db.query('UPDATE Team SET ? WHERE Id = ? AND DELETED = 0', [body, id], (err, _) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    res.sendStatus(ResultCodes.OK);
                });
            } else {
                res.sendStatus(ResultCodes.NO_CONTENT);
            }
        });
    });

    app.delete('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        db.query('SELECT Id, Owner FROM Team WHERE Id = ? AND Deleted = 0', id, (err, team) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }
            if (team.length > 0) {
                team = team[0];

                if (team.Owner !== req.user.Nickname) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }
                db.beginTransaction(err => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    db.query('UPDATE TEAM SET Deleted = ? WHERE Id = ? AND Deleted = ?', [1, id, 0], (err, _) => {
                        if (err) {
                            console.log(err);
                            db.rollback(err => {
                                if (err) {
                                    console.log(err);
                                }
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            });
                            return;
                        }
                        db.query('UPDATE User SET Team = ? WHERE Team = ?', [null, id], (err, _) => {
                            if (err) {
                                console.log(err);
                                db.rollback(err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                });
                                return;
                            }
                            db.commit(err => {
                                if (err) {
                                    console.log(err);
                                    db.rollback(err => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                    });
                                    return;
                                }
                                res.sendStatus(ResultCodes.OK);
                            });
                        });
                    });
                });
            } else {
                res.sendStatus(ResultCodes.NO_CONTENT);
            }
        });
    });
};
