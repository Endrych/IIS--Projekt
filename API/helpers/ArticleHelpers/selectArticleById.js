const ResultCodes = require('../../enums/ResultCodes');
const RejectError = require('../../models/RejectError');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM ARTICLE WHERE Id = ? AND Deleted = 0', id)
            .then(res => {
                if (res.length > 0) {
                    resolve(res[0]);
                } else {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
