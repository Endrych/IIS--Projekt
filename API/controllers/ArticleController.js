const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const articleValidator = require('../validators/ArticleValidator');
const moment = require('moment');

module.exports = app => {
    app.get('/articles', (req, res) => {
        var offset = parseInt(req.query.offset) || 0;
        var count = parseInt(req.query.count) || 50;

        if (step < 0 || count < 0) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        db.query(
            'SELECT * FROM ARTICLE WHERE Deleted = 0 order by Created DESC limit ?',
            count + step,
            (err, articles) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                } else {
                    res.send(articles.slice(offset));
                }
            }
        );
    });

    app.get('/articles/:gameid', (req, res) => {
        var gameId = parseInt(req.params.gameid);
        var offset = parseInt(req.query.offset) || 0;
        var count = parseInt(req.query.count) || 50;

        if (step < 0 || count < 0) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        db.query(
            'SELECT * FROM ARTICLE WHERE Deleted = ? AND Game = ? order by Created DESC limit ?',
            [0, gameId, count + offset],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                }
                res.send(result.slice(offset));
            }
        );
    });

    app.post('/article', (req, res) => {
        var body = req.body;
        if (req.user) {
            if (req.user.Admin > 0) {
                if (articleValidator.articleValidation(body)) {
                    body.Deleted = 0;
                    body.Created = moment().toISOString();
                    body.Author = req.user.Nickname;
                    db.query('INSERT INTO ARTICLE SET ?', body, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            return;
                        }
                        res.send(result['insertId'].toString());
                    });
                } else {
                    res.sendStatus(ResultCodes.BAD_REQUEST);
                }
            } else {
                res.sendStatus(ResultCodes.FORBIDDEN);
            }
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });

    app.get('/article/:id', (req, res) => {
        var id = parseInt(req.params.id);

        db.query('SELECT * FROM ARTICLE WHERE Id = ? AND Deleted = 0', id, (err, article) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            } else {
                if (article.length > 0) {
                    var data = article[0];
                    res.send(data);
                } else {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                }
            }
        });
    });

    app.put('/article/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;
        if (req.user) {
            if (req.user.Admin > 0) {
                if (articleValidator.articleValidation(body)) {
                    db.query('SELECT Id from ARTICLE WHERE Id = ? AND Deleted = 0', id, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            return;
                        }
                        if (result.length > 0) {
                            db.query('UPDATE ARTICLE SET ? WHERE Id = ? AND Deleted = ?', [body, id, 0], (err, _) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                }
                                res.sendStatus(ResultCodes.OK);
                            });
                        } else {
                            res.sendStatus(ResultCodes.NO_CONTENT);
                        }
                    });
                } else {
                    res.sendStatus(ResultCodes.BAD_REQUEST);
                }
            } else {
                res.sendStatus(ResultCodes.FORBIDDEN);
            }
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });

    app.delete('/article/:id', (req, res) => {
        var id = parseInt(req.params.id);
        if (req.user) {
            if (req.user.Admin > 0) {
                db.query('SELECT Id FROM ARTICLE WHERE Id = ? AND Deleted = 0', id, (err, article) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    } else {
                        if (article.length > 0) {
                            db.query(
                                'UPDATE ARTICLE SET Deleted = ? WHERE Id = ? AND Deleted = ?',
                                [1, id, 0],
                                (err, _) => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                    } else {
                                        res.sendStatus(ResultCodes.OK);
                                    }
                                }
                            );
                        } else {
                            res.sendStatus(ResultCodes.NO_CONTENT);
                        }
                    }
                });
            } else {
                res.sendStatus(ResultCodes.FORBIDDEN);
            }
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });
};
