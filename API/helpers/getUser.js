const db = require('../config/DbConnection');

module.exports = nickname => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM User WHERE Nickname = ?', nickname, (err, user) => {
            if (err) {
                reject(err);
            }
            if (user.length > 0) {
                resolve(user[0]);
            } else {
                resolve(null);
            }
        });
    });
};
