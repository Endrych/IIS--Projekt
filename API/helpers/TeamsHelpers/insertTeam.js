const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (team, user, db) => {
    return new Promise((resolve, reject) => {
        db.promiseBeginTransaction()
            .then(() => {
                db.promiseQuery('INSERT INTO team SET ?', team)
                    .then(res => {
                        db.promiseQuery('UPDATE user SET ? WHERE Nickname = ?', [{ Team: res.insertId }, user.Nickname])
                            .then(() => {
                                db.commit(err => {
                                    if (err) {
                                        db.promiseRollback();
                                        reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR));
                                    }
                                    resolve(res.insertId);
                                });
                            })
                            .catch(err => {
                                db.promiseRollback();
                                reject(err);
                            });
                    })
                    .catch(err => {
                        db.promiseRollback();
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
