module.exports = (name, db) => {
    return new Promise((resolve, reject) => {
        if (!name) {
            resolve();
        } else {
            db.promiseQuery('SELECT Id FROM Publisher WHERE Name = ?', name)
                .then(publisher => {
                    if (publisher.length !== 0) {
                        resolve(result[0].Id);
                    } else {
                        db.promiseQuery('INSERT INTO Publisher SET ?', { Name: name })
                            .then(res => {
                                resolve(res.insertId);
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
};
