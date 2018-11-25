module.exports = (team, user, db) => {
    return new Promise((resolve, reject) => {
        db.promiseBeginTransaction()
            .then(() => {})
            .catch(err => {
                reject(err);
            });
    });
};

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
            db.query('UPDATE User SET ? WHERE Nickname = ?', [{ Team: team.insertId }, req.user.Nickname, 0], err => {
                if (err) {
                    console.log(err);
                    db.rollback(err => {
                        if (err) {
                            console.log(err);
                        }
                        res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                    });
                } else {
                    db.commit(err => {
                        if (err) {
                            console.log(err);
                            db.rollback(err => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
                                }
                            });
                        } else {
                            res.send(new Result(ResultCodes.OK, team.insertId));
                        }
                    });
                }
            });
        });
    }
});
