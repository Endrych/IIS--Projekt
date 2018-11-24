module.exports = (id, game, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE GAME SET ? WHERE Id = ? AND Deleted = 0', [game, id])
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};
