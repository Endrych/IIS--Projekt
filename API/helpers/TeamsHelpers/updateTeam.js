module.exports = (team, id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE Team SET ? WHERE Id = ? AND DELETED = 0', [team, id])
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};
