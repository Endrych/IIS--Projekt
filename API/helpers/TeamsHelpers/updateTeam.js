module.exports = (team, id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE team SET ? WHERE Id = ? AND DELETED = 0', [team, id])
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};
