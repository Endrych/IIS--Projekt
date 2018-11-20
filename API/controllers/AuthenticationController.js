const UserValidator = require('../validators/UserValidator');
const ResultCodes = require('../enums/ResultCodes');
const hashPassword = require('../helpers/AuthenticationHelpers/hashPassword');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const checkIfUserExists = require('../helpers/UsersHelpers/checkIfUserExists');
const selectLoginUserInfo = require('../helpers/AuthenticationHelpers/selectLoginUserInfo');

module.exports = app => {
    const db = app.db;

    app.post('/register', (req, res) => {
        var body = req.body;

        if (!UserValidator.registerValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        checkIfUserExists(body.Nickname, db)
            .then(exists => {
                if (exists) {
                    res.sendStatus(ResultCodes.SEE_OTHER);
                    return;
                }
                hashPassword(body.Password)
                    .then(hashAndSalt => {
                        delete body.PasswordConfirm;

                        registerUser(body, hashAndSalt.hash, hashAndSalt.salt, db)
                            .then(_ => {
                                res.sendStatus(ResultCodes.OK);
                            })
                            .catch(err => {
                                throw err;
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/login', (req, res) => {
        var body = req.body;

        if (!body || !UserValidator.loginValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        selectLoginUserInfo(body.Nickname, db)
            .then(user => {
                if (!user) {
                    res.sendStatus(ResultCodes.UNAUTHORIZED);
                } else {
                    hashPassword(body.Password, user.Salt)
                        .then(hashAndSalt => {
                            if (hashAndSalt.hash === user.Password) {
                                var token = jwt.sign({ id: body.Nickname }, config.secret);
                                res.send({
                                    Nickname: user.Nickname,
                                    Admin: user.Admin,
                                    Token: token
                                });
                            } else {
                                res.sendStatus(ResultCodes.UNAUTHORIZED);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        });
                }
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
