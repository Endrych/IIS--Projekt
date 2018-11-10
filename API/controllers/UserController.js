const db = require('../config/DbConnection');
const bcrypt = require('bcryptjs');
const UserValidator = require('../validators/UserValidator');
const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');

module.exports = app => {
    function getTeamName(teamId) {
        return new Promise((resolve, reject) => {
            if (teamId) {
                db.query('SELECT Id,Name FROM Team WHERE Id = ? AND Deleted = ?', [teamId, 0], (err, team) => {
                    if (err) {
                        reject(err);
                    } else {
						console.log(team)
                        resolve(team);
                    }
                });
            } else {
                resolve(null);
            }
        });
    }

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
					if(user.length === 1){
						var userData = user[0]
						getTeamName(userData.Team)
                        .then(team => {
                            userData.Team = team;
                            res.send(new Result(ResultCodes.OK, userData));
                        })
                        .catch(err => {
                            console.log(err);
                            res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                        });
					}else{
						res.send(new Result(ResultCodes.NO_CONTENT));
					}
                }
            }
        );
    });

    app.post('/user/register', (req, res) => {
        var body = req.body;
        if (UserValidator.registerValidation(body)) {
            db.query('SELECT Nickname FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
                if (result.length === 0) {
                    bcrypt.genSalt().then(salt => {
                        bcrypt.hash(body.Password, salt, (err, hash) => {
                            if (err) {
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            } else {
                                delete body.PasswordConfirm;
                                body.Password = hash;
                                body.Salt = salt;
                                db.query('INSERT INTO USER SET ?', body, (err, result) => {
                                    if (err) {
                                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                    } else {
                                        res.send(new Result(ResultCodes.OK));
                                    }
                                });
                            }
                        });
                    });
                } else {
                    res.send(new Result(ResultCodes.SEE_OTHER));
                }
            });
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }
    });

    app.post('/user/login', (req, res) => {
        var body = req.body;
        if (body) {
            if (UserValidator.loginValidation(body)) {
                db.query('SELECT Password, Salt FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
                    if (result.length > 0) {
                        var dbUser = result[0];
                        bcrypt.hash(body.Password, dbUser.Salt, (err, hash) => {
                            if (err) {
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            } else {
                                if (hash === dbUser.Password) {
                                    res.send(new Result(ResultCodes.OK));
                                } else {
                                    res.send(new Result(ResultCodes.BAD_REQUEST));
                                }
                            }
                        });
                    } else {
                        res.send(new Result(ResultCodes.BAD_REQUEST));
                    }
                });
            } else {
                res.send(new Result(ResultCodes.BAD_REQUEST));
            }
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }
    });
};
