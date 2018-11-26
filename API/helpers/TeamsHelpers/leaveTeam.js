const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (user, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('Select Owner FROM Team WHERE Id = ?', user.Team)
            .then(team => {
                if (team.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }

                team = team[0];

                if (team.Owner === user.Nickname) {
                    reject(new RejectError(ResultCodes.FORBIDDEN));
                    return;
                }

                db.promiseQuery('UPDATE User SET ? WHERE Nickname = ?', [{ Team: null }, user.Nickname])
                    .then(() => {
                        resolve(null);
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
