const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (user, id, db) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject(new RejectError(ResultCodes.FORBIDDEN));
            return;
        }
        db.promiseQuery('Select Owner FROM team WHERE Id = ? AND Deleted = 0', id)
            .then(team => {
                if (team.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
                team = team[0];
                if (!user) {
                    reject(new RejectError(ResultCodes.UNAUTHORIZED));
                }
                if (user.Nickname !== team.Owner) {
                    reject(new RejectError(ResultCodes.FORBIDDEN));
                } else {
                    resolve();
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
