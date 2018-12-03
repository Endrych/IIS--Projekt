module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id, Name, Logo FROM team WHERE Deleted = 0')
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
