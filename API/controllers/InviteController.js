const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const teamValidator = require('../validators/TeamValidator');
const moment = require('moment');

module.exports = app => {
    app.post('/invite', (req, res) => {
        var body = req.body;
        var dataObj = {};

        if (!body.User || !body.Team) {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }

        dataObj.User = body.User;
        dataObj.Team = body.Team;

        db.query('INSERT INTO INVITE SET ?', dataObj, (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                res.send(new Result(ResultCodes.OK));
            }
        });
    });

    app.get('/user/:id/invite', (req, res) => {
        var id = req.params.id;
        db.query('SELECT Team FROM INVITE WHERE User = ?', id, (err, invites) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                if (invites.length > 0) {
                    db.query(
                        'SELECT Id, Name, Logo FROM Team WHERE Deleted = 0 AND Id IN (' +
                            Array(invites.length + 1)
                                .join('?')
                                .split('')
                                .join(',') +
                            ')',
                        invites.map(p => p.Team),
                        function(err, teams) {
                            if (err) {
                                console.log(err);
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            }
                            res.send(new Result(ResultCodes.OK, teams));
                        }
                    );
                } else {
                    res.send(new Result(ResultCodes.OK, []));
                }
            }
        });
    });

    app.post('/invite/accept', (req, res) => {
        var body = req.body;

        if (!body.User || !body.Team) {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        } else {
            db.beginTransaction(err => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                } else {
                    db.query(
                        'SELECT * From Invite Where User = ? AND Team = ?',
                        [body.User, body.Team],
                        (err, invite) => {
                            if (err) {
                                console.log(err);
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            } else {
                                if (invite.length > 0) {
                                    db.query(
                                        'UPDATE User SET ? WHERE Nickname = ?',
                                        [{ Team: body.Team }, body.User],
                                        (err, _) => {
                                            if (err) {
                                                console.log(err);
                                                db.rollback(err => {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                                });
                                            } else {
                                                deleteInvite(body.User, body.Team)
                                                    .then(_ => {
                                                        db.commit(err => {
                                                            if (err) {
                                                                console.log(err);
                                                                db.rollback(err => {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {
                                                                        res.send(
                                                                            new Result(
                                                                                ResultCodes.INTERNAL_SERVER_ERROR
                                                                            )
                                                                        );
                                                                    }
                                                                });
                                                            } else {
                                                                res.send(new Result(ResultCodes.OK));
                                                            }
                                                        });
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        db.rollback(err => {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                                            }
                                                        });
                                                    });
                                            }
                                        }
                                    );
                                } else {
                                    res.send(new Result(ResultCodes.NO_CONTENT));
                                }
                            }
                        }
                    );
                }
            });
        }
    });

    function deleteInvite(user, team) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM Invite WHERE User = ? AND Team = ? ', [user, team], (err, _) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    app.post('/invite/decline', (req, res) => {
        var body = req.body;

        if (!body.User || !body.Team) {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        } else {
            deleteInvite(body.User, body.Team)
                .then(deleteRes => {
                    res.send(new Result(ResultCodes.OK));
                })
                .catch(err => {
                    console.log('err', err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                });
        }
    });
};
