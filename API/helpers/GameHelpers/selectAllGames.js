module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id, Name, Keyname, Icon FROM GAME WHERE Deleted = 0')
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
