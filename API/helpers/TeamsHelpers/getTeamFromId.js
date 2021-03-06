module.exports = (teamId, db) => {
    return new Promise((resolve, reject) => {
        if (teamId) {
            db.promiseQuery('SELECT Id,Name FROM team WHERE Id = ? AND Deleted = 0', teamId)
                .then(team => {
                    if (team.length > 0) {
                        resolve(team[0]);
                    } else {
                        resolve(null);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            resolve(null);
        }
    });
};
