const db = require('../config/DbConnection');
const ResultCodes = require('../enums/ResultCodes');
const getTeam = require('../helpers/TeamConrollerHelpers/getTeamFromId');
const userValidator = require('../validators/UserValidator');

module.exports = app => {
    app.get('/user', (req, res) => {
        if (req.user) {
            var user = req.user;
            delete user.Password;
            delete user.Salt;
            res.send(req.user);
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });

    app.get('/user/:nickname', (req, res) => {
        var nickname = req.params.nickname;
        db.query(
            'SELECT Nickname, Firstname, Lastname, Team FROM USER WHERE ?',
            { Nickname: nickname },
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                } else {
                    if (user.length === 1) {
                        var userData = user[0];
                        getTeam(userData.Team, db)
                            .then(team => {
                                userData.Team = team;
                                res.send(userData);
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            });
                    } else {
                        res.sendStatus(ResultCodes.NO_CONTENT);
                    }
                }
            }
        );
    });

    app.put('/user/edit', (req, res) => {
        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (!userValidator.editValidation(req.body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        db.query('UPDATE User SET ? WHERE Nickname = ?', [req.body, req.user.Nickname], (err, _) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }
            res.sendStatus(ResultCodes.OK);
        });
    });
};
