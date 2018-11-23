const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (keyname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM GAME WHERE Keyname = ? AND Deleted = 0', keyname)
            .then(game => {
                if (game.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                resolve(game[0]);
            })
            .catch(err => {
                reject(err);
            });
    });
};
