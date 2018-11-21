const db = require('../../config/dbconnection');

module.exports = (user, team) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Invite WHERE User = ? AND Team = ? ', [user, team], (err, _) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
