module.exports = (keyname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM GAME WHERE Keyname = ? AND Deleted = 0', keyname)
            .then(game => {
                if (game.length === 0) {
                    resolve(null);
                    return;
                }
                resolve(game[0]);
            })
            .catch(err => {
                reject(err);
            });
    });
};
