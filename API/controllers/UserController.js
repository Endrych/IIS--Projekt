const db = require('../config/DbConnection');
const UserValidator = require('../validators/UserValidator');
const ResultCodes = require('../enums/ResultCodes');
const getTeam = require('../helpers/TeamConrollerHelpers/getTeamFromId');
const hashPassword = require('../helpers/hashPassword');

module.exports = app => {
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

    app.post('/register', (req, res) => {
        var body = req.body;
        if (UserValidator.registerValidation(body)) {
            db.query('SELECT Nickname FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                } else {
                    if (result.length === 0) {
                        hashPassword(body.Password)
                            .then(hashAndSalt => {
                                delete body.PasswordConfirm;
                                body.Password = hashAndSalt.hash;
                                body.Salt = hashAndSalt.salt;
                                body.Admin = 0;

                                db.query('INSERT INTO USER SET ?', body, (err, _) => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                    } else {
                                        res.sendStatus(ResultCodes.OK);
                                    }
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            });
                    } else {
                        res.sendStatus(ResultCodes.SEE_OTHER);
                    }
                }
            });
        } else {
            res.sendStatus(ResultCodes.BAD_REQUEST);
        }
    });

    app.post('/login', (req, res) => {
        var body = req.body;
        if (body) {
            if (UserValidator.loginValidation(body)) {
                db.query('SELECT Nickname, Admin, Password, Salt FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    }
                    if (result.length > 0) {
                        var dbUser = result[0];
                        hashPassword(body.Password, dbUser.Salt)
                            .then(hashAndSalt => {
                                if (hashAndSalt.hash === dbUser.Password) {
                                    res.send({Nickname: dbUser.Nickname, Admin: dbUser.Admin});
                                } else {
                                    res.sendStatus(ResultCodes.UNAUTHORIZED);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            });
                    } else {
                        res.sendStatus(ResultCodes.UNAUTHORIZED);
                    }
                });
            } else {
                res.sendStatus(ResultCodes.BAD_REQUEST);
            }
        } else {
            res.sendStatus(ResultCodes.BAD_REQUEST);
        }
    });
};
