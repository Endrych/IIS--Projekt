const ResultCodes = require('../enums/ResultCodes');
const articleValidator = require('../validators/ArticleValidator');
const selectNewestArticles = require('../helpers/ArticleHelpers/selectNewestArticles');
const selectNewestArtilcesByGameId = require('../helpers/ArticleHelpers/selectNewestArtilcesByGameId');
const insertNewArticle = require('../helpers/ArticleHelpers/insertNewArticle');
const selectArticleById = require('../helpers/ArticleHelpers/selectArticleById');
const updateArticle = require('../helpers/ArticleHelpers/updateArticle');
const processError = require('../helpers/processError');
const getGameForArticle = require('../helpers/GameHelpers/getGameForArticle');

module.exports = app => {
    const db = app.db;

    app.get('/articles', (req, res) => {
        var offset = parseInt(req.query.offset) || 0;
        var count = parseInt(req.query.count) || 50;

        if (offset < 0 || count < 0) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        selectNewestArticles(count, offset, db)
            .then(articles => {
                res.send(articles);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/articles/:gameid', (req, res) => {
        var gameId = parseInt(req.params.gameid);
        var offset = parseInt(req.query.offset) || 0;
        var count = parseInt(req.query.count) || 50;

        if (offset < 0 || count < 0) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        selectNewestArtilcesByGameId(gameId, count, offset, db)
            .then(articles => {
                res.send(articles);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/article', (req, res) => {
        var body = req.body;
        if (req.user) {
            if (req.user.Admin > 0) {
                if (articleValidator.articleValidation(body)) {
                    insertNewArticle(body, req.user.Nickname, db)
                        .then(articleId => {
                            res.send(articleId);
                        })
                        .catch(err => {
                            processError(res, err);
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

        selectArticleById(id, db)
            .then(article => {
                if (article.Game) {
                    getGameForArticle(article.Game, db)
                        .then(game => {
                            article.Game = game;
                            res.send(article);
                        })
                        .catch(err => {
                            processError(res, err);
                        });
                } else {
                    res.send(article);
                }
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.put('/article/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;
        if (req.user) {
            if (req.user.Admin > 0) {
                if (articleValidator.articleValidation(body)) {
                    updateArticle(id, body, db)
                        .then(_ => {
                            res.sendStatus(ResultCodes.OK);
                        })
                        .catch(err => {
                            processError(res, err);
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
                updateArticle(id, { Deleted: 1 }, db)
                    .then(_ => {
                        res.sendStatus(ResultCodes.OK);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            } else {
                res.sendStatus(ResultCodes.FORBIDDEN);
            }
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });
};
