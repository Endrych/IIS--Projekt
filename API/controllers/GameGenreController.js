const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');

module.exports = app => {
    app.get('/genres', (req, res) => {
        db.query('SELECT * FROM GAME_GENRE', (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
            }
            res.send(result);
        });
    });

    app.get('/genres/:name', (req, res) => {
        var name = req.params.name;

        db.query('SELECT Id FROM GAME_GENRE WHERE Name = ?', name, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }

            if (result.length === 0) {
                res.sendStatus(ResultCodes.NO_CONTENT);
                return;
            }

            db.query('SELECT GameId FROM GAME_GENRE_GAMES WHERE GameGenreId = ?', result[0].Id, (err, result1) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    return;
                }
                if (result1.length === 0) {
                    res.send([]);
                    return;
                }

                db.query(
                    'SELECT Id, Name, Keyname, Icon FROM Game WHERE Deleted = 0 AND Id IN (' +
                        Array(result1.length + 1)
                            .join('?')
                            .split('')
                            .join(',') +
                        ')',
                    result1.map(p => p.GameId),
                    function(err, result_games) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                            return;
                        }
                        res.send(result_games);
                    }
                );
            });
        });
    });
};
