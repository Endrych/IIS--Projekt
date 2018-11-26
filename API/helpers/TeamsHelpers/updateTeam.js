const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (team, id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE Team SET ? WHERE Id = ? AND DELETED = 0', [team, id])
            .then(() => {
                db.commit(err => {
                    if (err) {
                        db.promiseRollback();
                        reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR));
                    }
                    resolve();
                });
            })
            .catch(err => {
                db.promiseRollback();
                reject(err);
            });
    });
};
