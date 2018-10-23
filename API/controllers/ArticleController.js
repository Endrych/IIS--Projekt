const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const articleValidator = require('../validators/ArticleValidator');


module.exports = app => {

    // Ziskavani seznamu

    app.post('/article', (req, res) => {
        var body = req.body;
        if (articleValidator.addArticleValidation(body)) {
            body.Deleted = 0;
            db.query("INSERT INTO ARTICLE SET ?", body, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                }
                res.send(new Result(ResultCodes.OK, result['insertId']));
            });
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }
    });

    app.get('/article/:id', (req, res) => {
        var id = req.params.id;
        db.query('SELECT * FROM ARTICLE WHERE Id = ? AND Deleted = 0', id, (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            }
            if (result.length > 0) {
                var data = result[0];
                delete data.Deleted;
                res.send(new Result(ResultCodes.OK, data));
            } else {
                res.send(new Result(ResultCodes.NO_CONTENT));
            }
        });
    });

    app.put('/article/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;

        if (articleValidator.addArticleValidation(body)) {
            db.query("SELECT Id from ARTICLE WHERE Id = ? AND Deleted = 0", id, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                }
                if (result.length > 0) {
                    db.query(
                        'UPDATE ARTICLE SET ? WHERE Id = ? AND Deleted = ?',
                        [body, id, 0],
                        (err, result2) => {
                            if(err){
                                console.log(err);
                                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                            }
                            res.send(new Result(ResultCodes.OK));
                        });
                } else {
                    res.send(new Result(ResultCodes.NO_CONTENT));
                }
            });
        } else {
            res.send(new Result(ResultCodes.BAD_REQUEST));
        }

    });

    app.delete('/article/:id', (req, res) => {
        var id = req.params.id;
        db.query('UPDATE ARTICLE SET Deleted = ? WHERE Id = ? AND Deleted = ?', [1, id, 0], (err, result) => {
            if (err) {
                console.log(err);
                res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
            }
            res.send(new Result(ResultCodes.OK));
        });
    });
}