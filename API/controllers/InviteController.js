const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const processError = require('../helpers/processError');
const deleteInvite = require('../helpers/InviteConrollerHelpers/deleteInvite');


module.exports = app => {
    app.post('/invite', (req, res) => {
        var body = req.body;
        var dataObj = {};

        if (!body.User || !body.Team) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        dataObj.User = body.User;
        dataObj.Team = body.Team;

        db.query('SELECT Owner FROM Team WHERE Id = ? AND Deleted = 0', dataObj.Team, (err, team) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }

            if (team.length > 0) {
                if (!team[0].Owner === req.user.Nickname) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }
                db.query('INSERT INTO INVITE SET ?', dataObj, (err, _) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    res.sendStatus(ResultCodes.OK);
                });
            }
        });
    });

    app.get('/user/:id/invites', (req, res) => {
        var id = req.params.id;

        db.query('SELECT Team FROM INVITE WHERE User = ?', id, (err, invites) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }
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
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        }
                        res.send(teams);
                    }
                );
            } else {
                res.send([]);
            }
        });
    });

    app.post('/invite/:team/accept', (req, res) => {
        var team = req.params.team;

        if (!team) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }
        var nickname = req.user.Nickname;

        db.beginTransaction(err => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            } else {
                db.query('SELECT * From Invite Where User = ? AND Team = ?', [nickname, team], (err, invite) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    if (invite.length > 0) {
                        db.query('UPDATE User SET ? WHERE Nickname = ?', [{ Team: team }, nickname], (err, _) => {
                            if (err) {
                                console.log(err);
                                db.rollback(err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                });
                            } else {
                                deleteInvite(nickname, team)
                                    .then(_ => {
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
                                                res.sendStatus(ResultCodes.OK);
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        db.rollback(err => {
                                            if (err) {
                                                console.log(err);
                                            }
                                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                        });
                                    });
                            }
                        });
                    } else {
                        res.sendStatus(ResultCodes.NO_CONTENT);
                    }
                });
            }
        });
    });

    app.post('/invite/:team/decline', (req, res) => {
        var team = req.params.team;

        if (!team) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        var nickname = req.user.Nickname;

        deleteInvite(nickname, team)
            .then(_ => {
                res.send(ResultCodes.OK);
            })
            .catch(err => {
                console.log('err', err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            });
    });
};
