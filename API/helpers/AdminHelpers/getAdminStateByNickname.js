const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname, Admin FROM USER WHERE Nickname = ?', nickname)
            .then(user => {
                if (user.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                resolve(user[0]);
            })
            .catch(err => {
                throw err;
            });
    });
};
