const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (user, id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('Select * FROM Invite WHERE Id = ? ', id)
            .then(invite => {
                if (invite.length > 0 && invite[0].User === user) {
                    db.promiseQuery('DELETE FROM Invite WHERE Id = ? ', id)
                        .then(() => {
                            resolve();
                        })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
