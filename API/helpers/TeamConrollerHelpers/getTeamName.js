function getTeamName(teamId,db) {
    return new Promise((resolve, reject) => {
        if (teamId) {
            db.query('SELECT Id,Name FROM Team WHERE Id = ? AND Deleted = ?', [teamId, 0], (err, team) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(team)
                    resolve(team);
                }
            });
        } else {
            resolve(null);
        }
    });
}

module.exports = getTeamName;