const getTeam = require('../TeamsHelpers/getTeamFromId');

module.exports = (nickname, team, db) => {
    return new Promise((resolve, reject) => {
        var tournamentsWinnerPromise = db.promiseQuery('SELECT Id, Name From Tournament WHERE Winner = ?', nickname);

        Promise.all([tournamentsWinnerPromise, getTeam(team, db)])
            .then(results => {
                resolve({ Tournaments: results[0], Team: results[1] });
            })
            .catch(error => {
                reject(error);
            });
    });
};
