const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (name, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id FROM game_genre WHERE Name = ?', name)
            .then(id => {
                if (id.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                resolve(id[0].Id);
            })
            .catch(err => {
                reject(err);
            });
    });
};
