const db = require('../config/DbConnection');
const bcrypt = require('bcryptjs');
const UserValidator = require('../validators/UserValidator');
const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const getTeamName = require('../helpers/TeamConrollerHelpers/getTeamName');

module.exports = app => {
    app.get('/user/:nickname', (req, res) => {
        var nickname = req.params.nickname;
        db.query(
            'SELECT Nickname, Firstname, Lastname, Team FROM USER WHERE ?',
            { Nickname: nickname },
            (err, user) => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                } else {
                    if (user.length === 1) {
                        var userData = user[0];
                        getTeamName(userData.Team, db)
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
                if (result.length === 0) {
                    bcrypt.genSalt().then(salt => {
                        bcrypt.hash(body.Password, salt, (err, hash) => {
                            if (err) {
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            } else {
                                delete body.PasswordConfirm;
                                body.Password = hash;
                                body.Salt = salt;
                                db.query('INSERT INTO USER SET ?', body, (err, result) => {
                                    if (err) {
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                    } else {
                                        res.sendStatus(ResultCodes.OK);
                                    }
                                });
                            }
                        });
                    });
                } else {
                    res.sendStatus(ResultCodes.SEE_OTHER);
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
                db.query('SELECT Password, Salt FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    }
                    if (result.length > 0) {
                        var dbUser = result[0];
                        bcrypt.hash(body.Password, dbUser.Salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            } else {
                                if (hash === dbUser.Password) {
                                    res.sendStatus(ResultCodes.OK);
                                } else {
                                    res.sendStatus(ResultCodes.UNAUTHORIZED);
                                }
                            }
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
