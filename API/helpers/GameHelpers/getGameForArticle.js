const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id, Name, Keyname FROM game WHERE Deleted = 0 AND Id = ?', id)
            .then(name => {
                if (name.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                resolve(name[0]);
            })
            .catch(err => {
                reject(err);
            });
    });
};
