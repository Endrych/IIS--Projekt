const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (teamId, db) => {
    return new Promise((resolve, reject) => {
        Promise.all([getTeam(teamId, db), getTeamUsers(teamId, db)])
            .then(results => {
                var team = results[0];
                delete team.Deleted;
                var users = results[1]
                resolve({
                    ...team,
                    Users:[
                        ...users
                    ]
                })
            }).catch(err=>{
                reject(err);
            })
            
    });
};

function getTeam(teamId, db) {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM TEAM WHERE Deleted = 0 AND Id = ?', teamId)
            .then(team => {
                if (team.length > 0) {
                    resolve(team[0]);
                } else {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getTeamUsers(teamId, db) {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname FROM User WHERE Team = ?', teamId)
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                reject(err);
            });
    });
}
