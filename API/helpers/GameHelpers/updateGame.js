module.exports = (keyname, game, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE GAME SET ? WHERE Keyname = ? AND Deleted = 0', [game, keyname])
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
