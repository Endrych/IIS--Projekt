module.exports = (adminLevel, nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE user SET ? WHERE Nickname = ?', [{ Admin: adminLevel }, nickname])
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
