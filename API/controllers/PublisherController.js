const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');

module.exports = app => {
    app.get('/publishers', (req, res) => {
        db.query('SELECT * FROM Publisher', (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                return;
            }
            res.send(result);
        });
    });

    app.get('/publisher/:id', (req, res) => {
        var id = req.params.id;
        db.query(
            'SELECT Id, Name, Keyname, Icon FROM GAME WHERE PublisherId = ? AND Deleted = 0 ',
            [id],
            (err, result) => {
                if (err) {
                    res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                    return;
                }
                res.send(result);
            }
        );
    });
};
