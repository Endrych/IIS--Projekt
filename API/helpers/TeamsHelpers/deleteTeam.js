module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE TEAM SET Deleted= 1 WHERE Id = ? AND Deleted = 0',id)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};



