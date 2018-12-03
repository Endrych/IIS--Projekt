module.exports = (nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname, Admin, Password, Salt, Deactivated FROM user WHERE Nickname = ?', nickname)
            .then(user => {
                if (user.length > 0) {
                    resolve(user[0]);
                } else {
                    resolve(null);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
