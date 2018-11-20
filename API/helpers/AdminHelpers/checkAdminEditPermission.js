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

        getAdminStateByNickname(nickname)
            .then(user => {
                if (user.length > 0) {
                    if (user[0].Admin === 2) {
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
