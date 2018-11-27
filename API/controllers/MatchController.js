const ResultCodes = require('../enums/ResultCodes');
const processError = require('../helpers/processError');

module.exports = app => {
    const db = app.db;

    app.post('/match/:id', (req, res) => {
        var id = parseInt(req.params.id);
        var score1 = parseInt(req.query.score1);
        var score2 = parseInt(req.query.score2);

        if (isNaN(id) || isNaN(score1) || isNaN(score2)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        db.promiseQuery('Select * FROM TMatch WHERE Id = ?', id)
            .then(match => {
                if (match.length === 0) {
                    res.sendStatus(ResultCodes.NO_CONTENT);
                    return;
                }
                match = match[0];
                if (match.Score1 || match.Score2) {
                    res.sendStatus(ResultCodes.FORBIDDEN);
                    return;
                }
                db.promiseQuery('Update TMatch SET ? Where Id = ?', [{ Score1: score1, Score2: score2 }, id])
                    .then(() => {
                        res.sendStatus(ResultCodes.OK);
                    })
                    .catch(err => {
                        processError(res, err);
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
