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

                var checkInvitePromise = db.promiseQuery('SELECT Id FROM invite Where Team = ? AND User = ? ', [
                    req.user.Team,
                    user
                ]);
                var checkUserPromise = db.promiseQuery('SELECT Nickname FROM user WHERE Nickname = ?', user);

                Promise.all([checkInvitePromise, checkUserPromise])
                    .then(results => {
                        invite = results[0];
                        user = results[1];

                        if (invite.length > 0) {
                            res.sendStatus(ResultCodes.SEE_OTHER);
                            return;
                        }

                        if (user.length === 0) {
                            res.sendStatus(ResultCodes.NO_CONTENT);
                            return;
                        }
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

        db.promiseQuery('SELECT Id, Team FROM invite WHERE User = ?', req.user.Nickname)
            .then(invites => {
                if (invites.length > 0) {
                    db.promiseQuery(
                        'SELECT Id, Name, Logo FROM team WHERE Deleted = 0 AND Id IN (' +
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
        var id = parseInt(req.query.id);

        if (isNaN(id)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Team) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        db.promiseBeginTransaction()
            .then(() => {
                db.promiseQuery('SELECT * From invite Where User = ? AND Id = ?', [req.user.Nickname, id])
                    .then(invite => {
                        if (invite.length === 0) {
                            res.sendStatus(ResultCodes.NO_CONTENT);
                            return;
                        }

                        db.promiseQuery('UPDATE user SET ? WHERE Nickname = ?', [
                            { Team: invite[0].Team },
                            req.user.Nickname
                        ])
                            .then(() => {
                                deleteInvite(req.user.Nickname, id, db)
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
            })
            .catch(err => {
                processError(res, err);
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
