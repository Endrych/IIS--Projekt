const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');

module.exports = app => {
    app.get('/admin/:nickname', (req, res) => {
        var nickname = req.params.nickname;
        console.log(nickname);
        db.query('SELECT Nickname, Admin FROM USER WHERE Nickname = ?', nickname, (err, user) => {
            if (user.length === 0) {
                res.sendStatus(ResultCodes.NO_CONTENT);
                return;
            }
            res.send(user[0].Admin.toString());
        });
    });

    app.post('/admin/:nickname', (req, res) => {
        var adminLevel = parseInt(req.query.level);
        var nickname = req.params.nickname;

        if (isNaN(adminLevel) || adminLevel < 0 || adminLevel > 1) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        if (req.user) {
            if (req.user.Admin === 2) {
                db.query('SELECT Nickname, Admin FROM USER WHERE Nickname = ?', nickname, (err, user) => {
                    if (err) {
                        console.log(err);

                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    if (user.length > 0) {
                        if (user[0].Admin === 2) {
                            res.sendStatus(ResultCodes.FORBIDDEN);
                        } else {
                            db.query(
                                'UPDATE USER SET ? WHERE Nickname = ?',
                                [{ Admin: adminLevel }, nickname],
                                (err, _) => {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(ResultCodes.INTERNAL_SERVER_ERROR);
                                        return;
                                    }
                                    res.sendStatus(ResultCodes.OK);
                                }
                            );
                        }
                    } else {
                        res.sendStatus(ResultCodes.NO_CONTENT);
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
