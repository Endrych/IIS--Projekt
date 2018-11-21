module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM GAME_GENRE')
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
