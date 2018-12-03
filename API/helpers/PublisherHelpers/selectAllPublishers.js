module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM publisher')
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
