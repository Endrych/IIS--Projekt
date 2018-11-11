function getTeamName(teamId, db) {
    return new Promise((resolve, reject) => {
        if (teamId) {
            db.query('SELECT Id,Name FROM Team WHERE Id = ? AND Deleted = ?', [teamId, 0], (err, team) => {
                if (err) {
                    reject(err);
                } else {
                    if (team.length > 0) {
                        resolve(team[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        } else {
            resolve(null);
        }
    });
}

module.exports = getTeamName;
