const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const teamValidator = require('../validators/TeamValidator');
const getAllTeams = require('../helpers/TeamsHelpers/getAllTeams');
const processError = require('../helpers/processError');
const getTeamProfile = require('../helpers/TeamsHelpers/getTeamProfile');
const deleteTeam = require('../helpers/TeamsHelpers/deleteTeam');
const checkTeamEditPermission = require('../helpers/TeamsHelpers/checkTeamEditPermission');

module.exports = app => {
    const db = app.db;

    app.get('/teams', (req, res) => {
        getAllTeams(db)
            .then(teams => {
                res.send(teams);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        getTeamProfile(id, db)
            .then(team => {
                res.send(team);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/team', (req, res) => {
        var body = req.body;
        if (teamValidator.addTeamValidation(body)) {
            body.Created = new Date();
            body.Deleted = 0;
            db.beginTransaction(err => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                } else {
                    db.query('INSERT INTO TEAM SET ?', body, (err, team) => {
                        if (err) {
                            console.log(err);
                            db.rollback(err => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                }
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
                                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                    });
                                } else {
                                    db.commit(err => {
                                        if (err) {
                                            console.log(err);
                                            db.rollback(err => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                                }
                                            });
                                        } else {
                                            res.send(new Result(ResultCodes.OK, team.insertId));
                                        }
                                    });
                                }
                            }
                        );
                    });
                }
            });
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }
    });

    app.put('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        var body = req.body;

        db.query('SELECT Id FROM Team WHERE Id = ? AND Deleted = 0', id, (err, team) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                if (team.length > 0) {
                    if (!teamValidator.addTeamValidation(body)) {
                        res.send(new Result(ResultCodes.BAD_REQUEST));
                    } else {
                        db.query('UPDATE Team SET ? WHERE Id = ? AND DELETED = 0', [body, id], (err, _) => {
                            if (err) {
                                console.log(err);
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            } else {
                                res.send(new Result(ResultCodes.OK));
                            }
                        });
                    }
                } else {
                    res.send(new Result(ResultCodes.NO_CONTENT));
                }
            }
        });
    });

    app.delete('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);

        checkTeamEditPermission(req.user, id, db)
            .then(() => {
                deleteTeam(id, db)
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
};
