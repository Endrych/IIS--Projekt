module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id, Name, Keyname, Icon FROM game WHERE PublisherId = ? AND Deleted = 0 ', id)
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
