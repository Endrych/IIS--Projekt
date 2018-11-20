module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM Publisher')
            .then(res => resolve(res))
            .catch(err => {
                throw err;
            });
    });
};
