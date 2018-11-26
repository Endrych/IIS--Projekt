const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const teamValidator = require('../validators/TeamValidator');
const getAllTeams = require('../helpers/TeamsHelpers/getAllTeams');
const processError = require('../helpers/processError');
const getTeamProfile = require('../helpers/TeamsHelpers/getTeamProfile');
const deleteTeam = require('../helpers/TeamsHelpers/deleteTeam');
const checkTeamEditPermission = require('../helpers/TeamsHelpers/checkTeamEditPermission');
const insertTeam = require('../helpers/TeamsHelpers/insertTeam');
const updateTeam = require('../helpers/TeamsHelpers/updateTeam');
const leaveTeam = require('../helpers/TeamsHelpers/leaveTeam');

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

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Team) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        if (!teamValidator.addTeamValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        body.Owner = req.user.Nickname;
        body.Created = new Date();
        body.Deleted = 0;

        insertTeam(body, req.user, db)
            .then(teamId => {
                res.send(teamId.toString());
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.put('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        var body = req.body;

        checkTeamEditPermission(req.user, id, db)
            .then(() => {
                updateTeam(body, id, db)
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

    app.post('/team/leave', (req, res) => {
        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (!req.user.Team) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        leaveTeam(req.user, db)
            .then(() => {
                res.sendStatus(ResultCodes.OK);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
