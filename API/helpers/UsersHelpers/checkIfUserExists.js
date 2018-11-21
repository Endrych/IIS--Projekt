module.exports = (nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Nickname FROM USER WHERE Nickname = ?', nickname)
            .then(user => {
                if (user.length > 0) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
            .catch(err => {
                throw err;
            });
    });
};