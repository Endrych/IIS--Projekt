const ResultCodes = require('../../enums/ResultCodes');
const getTeam = require('../TeamsHelpers/getTeamFromId');
const RejectError = require('../../models/RejectError');

module.exports = (db, nickname) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname, Firstname, Lastname, Team FROM USER WHERE ?', { Nickname: nickname })
            .then(user => {
                if (user.length === 1) {
                    var userData = user[0];

                    getTeam(userData.Team, db)
                        .then(team => {
                            userData.Team = team;
                            resolve(user);
                        })
                        .catch(error => {
                            reject(error);
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
