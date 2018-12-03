module.exports = (keyname, game, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE game SET ? WHERE Keyname = ? AND Deleted = 0', [game, keyname])
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
