const ResultCodes = require('../../enums/ResultCodes');
const RejectError = require('../../models/RejectError');

module.exports = (id, article, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id from article WHERE Id = ? AND Deleted = 0', id)
            .then(res => {
                if (res.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                db.promiseQuery('UPDATE article SET ? WHERE Id = ? AND Deleted = 0', [article, id])
                    .then(_ => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
