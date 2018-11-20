const ResultCodes = require('../../enums/ResultCodes');
const RejectError = require('../../models/RejectError');

module.exports = (nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM User WHERE Nickname = ?', nickname)
            .then(user => {
                if (user.length > 0) {
                    resolve(user[0]);
                } else {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
            })
            .catch(err => {
                throw err;
            });
    });
};
