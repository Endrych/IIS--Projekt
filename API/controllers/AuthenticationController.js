const db = require('../config/DbConnection');
const UserValidator = require('../validators/UserValidator');
const ResultCodes = require('../enums/ResultCodes');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = app => {
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
                db.query(
                    'SELECT Nickname, Admin, Password, Salt FROM USER WHERE ?',
                    { Nickname: body.Nickname },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        }
                        if (result.length > 0) {
                            var dbUser = result[0];
                            hashPassword(body.Password, dbUser.Salt)
                                .then(hashAndSalt => {
                                    if (hashAndSalt.hash === dbUser.Password) {
                                        var token = jwt.sign({ id: body.Nickname }, config.secret);
                                        res.send({
                                            Nickname: dbUser.Nickname,
                                            Admin: dbUser.Admin,
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
                        } else {
                            res.sendStatus(ResultCodes.UNAUTHORIZED);
                        }
                    }
                );
            } else {
                res.sendStatus(ResultCodes.BAD_REQUEST);
            }
        } else {
            res.sendStatus(ResultCodes.BAD_REQUEST);
        }
    });
};
