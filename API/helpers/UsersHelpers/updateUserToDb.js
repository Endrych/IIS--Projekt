module.exports = (body, nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE user SET ? WHERE Nickname = ?', [body, nickname])
            .then(_ => {
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};
