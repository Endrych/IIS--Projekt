const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const teamValidator = require('../validators/TeamValidator');
const moment = require('moment');

module.exports = app => {
    app.get('/team', (req, res) => {
        db.query('SELECT Id, Name, Logo FROM TEAM WHERE Deleted = 0', (err, teams) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            }else{
                res.send(new Result(ResultCodes.OK, teams));
            }
        });
    });

    app.get('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM TEAM WHERE Deleted = 0 AND Id = ?', id, (err, team) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            } else {
                res.send(new Result(ResultCodes.OK, team));
            }
        });
    });

    app.post('/team', (req, res) => {
        var body = req.body;
        if (teamValidator.addTeamValidation(body)) {
            body.Created = moment();
            body.Deleted = 0;
            db.beginTransaction(err => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                } else {
                    db.query('INSERT INTO TEAM SET ?', body, (err, team) => {
                        if (err) {
                            console.log(err);
                            db.rollback(err => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                }
                            });
                        }
                        db.query(
                            'UPDATE User SET ? WHERE Nickname = ?',
                            [{ Team: team.insertId }, body.Owner, 0],
                            err => {
                                if (err) {
                                    console.log(err);
                                    db.rollback(err => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                    });
                                }
                                db.commit(err => {
                                    if(err){
                                        console.log(err);
                                        db.rollback(err => {
                                            if (err) {
                                                console.log(err);
                                            }else{
                                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                            }
                                        });
                                    }else{
                                        res.send(new Result(ResultCodes.OK, team.insertId));
                                    }
                                });
                            }
                        );
                    });
                }
            });
        }
    });

    app.delete('/team/:id', (req, res) => {
        var id = parseInt(req.params.id);
        db.query('UPDATE TEAM SET Deleted = ? WHERE Id = ? AND Deleted = ?', [1, id, 0], (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            }else{
                res.send(new Result(ResultCodes.OK));
            }
        });
    });
};
