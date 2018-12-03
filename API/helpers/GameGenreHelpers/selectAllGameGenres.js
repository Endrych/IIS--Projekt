module.exports = db => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM game_genre')
            .then(res => resolve(res))
            .catch(err => {
                reject(err);
            });
    });
};
