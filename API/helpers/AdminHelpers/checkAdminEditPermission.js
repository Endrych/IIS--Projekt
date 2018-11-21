const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');
const getAdminStateByNickname = require('./getAdminStateByNickname');

module.exports = (user, nickname, db) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject(new RejectError(ResultCodes.UNAUTHORIZED));
        }

        if (user.Admin !== 2) {
            reject(new RejectError(ResultCodes.FORBIDDEN));
        }

        getAdminStateByNickname(nickname, db)
            .then(user => {
                if (user) {
                    if (user.Admin === 2) {
                        reject(new RejectError(ResultCodes.FORBIDDEN));
                    } else {
                        resolve(null);
                    }
                } else {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
