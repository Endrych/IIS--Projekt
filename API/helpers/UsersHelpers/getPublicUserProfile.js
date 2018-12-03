const ResultCodes = require('../../enums/ResultCodes');
const RejectError = require('../../models/RejectError');
const getUserInfo = require('./getUserInfo');

module.exports = (db, nickname) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname, Firstname, Lastname, Team, Image FROM user WHERE ?', { Nickname: nickname })
            .then(user => {
                if (user.length === 1) {
                    var userData = user[0];
                    getUserInfo(nickname, userData.Team, db)
                        .then(info => {
                            userData.Tournaments = info.Tournaments;
                            userData.Team = info.Team;
                            resolve(userData);
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
