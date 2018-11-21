const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const teamValidator = require('../validators/TeamValidator');
const getAllTeams = require('../helpers/TeamsHelpers/getAllTeams');
const processError = require('../helpers/processError');


module.exports = app => {
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
        db.query('SELECT * FROM TEAM WHERE Deleted = 0 AND Id = ?', id, (err, team) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                if (team.length > 0) {
                    res.send(new Result(ResultCodes.OK, team));
                } else {
                    res.send(new Result(ResultCodes.NO_CONTENT));
                }
            }
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

    app.post('/team/:id', (req, res) => {
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
        db.query('UPDATE TEAM SET Deleted = ? WHERE Id = ? AND Deleted = ?', [1, id, 0], (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                res.send(new Result(ResultCodes.OK));
            }
        });
    });
};
