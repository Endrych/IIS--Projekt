module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseBeginTransaction()
            .then(() => {
                db.promiseQuery('UPDATE team SET Deleted= 1 WHERE Id = ? AND Deleted = 0', id)
                    .then(() => {
                        db.promiseQuery('UPDATE user SET ? WHERE Team = ?', [{ Team: null }, id])
                            .then(() => {
                                db.commit();
                                resolve();
                            })
                            .catch(err => {
                                db.promiseRollback();
                                reject(err);
                            });
                    })
                    .catch(err => {
                        db.promiseRollback();
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
