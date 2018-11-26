const ResultCodes = require('../enums/ResultCodes');
const processError = require('../helpers/processError');
const deleteInvite = require('../helpers/InviteConrollerHelpers/deleteInvite');
const checkTeamEditPermission = require('../helpers/TeamsHelpers/checkTeamEditPermission');

module.exports = app => {
    const db = app.db;

    app.post('/invite', (req, res) => {
        var user = req.query.user;

        var team = req.user ? req.user.Team : null;

        checkTeamEditPermission(req.user, team, db)
            .then(() => {
                var dataObj = { Team: req.user.Team, User: user };

                db.promiseQuery('INSERT INTO INVITE SET ?', dataObj)
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

    app.get('/invites', (req, res) => {
        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        db.promiseQuery('SELECT Id, Team FROM INVITE WHERE User = ?', req.user.Nickname)
            .then(invites => {
                if (invites.length > 0) {
                    db.promiseQuery(
                        'SELECT Id, Name, Logo FROM Team WHERE Deleted = 0 AND Id IN (' +
                            Array(invites.length + 1)
                                .join('?')
                                .split('')
                                .join(',') +
                            ')',
                        invites.map(p => p.Team)
                    )
                        .then(teams => {
                            var resObj = [];
                            teams.forEach(element => {
                                var invite = invites.find(invite => {
                                    return invite.Team === element.Id;
                                });
                                resObj.push({ Id: invite.Id, Team: element });
                            });

                            res.send(resObj);
                        })
                        .catch(err => {
                            processError(res, err);
                        });
                } else {
                    res.send([]);
                }
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/invite/accept', (req, res) => {
        var id = req.query.id;

        if (!id) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

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

    app.post('/invite/decline', (req, res) => {
        var id = parseInt(req.query.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        deleteInvite(req.user.Nickname, id, db)
            .then(() => {
                res.sendStatus(ResultCodes.OK);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
