module.exports = (name, db) => {
    return new Promise((resolve, reject) => {
        if (!name) {
            resolve();
        } else {
            db.promiseQuery('SELECT Id FROM publisher WHERE Name = ?', name)
                .then(publisher => {
                    if (publisher.length !== 0) {
                        resolve(publisher[0].Id);
                    } else {
                        db.promiseQuery('INSERT INTO publisher SET ?', { Name: name })
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
