module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT GameGenreId FROM game_genre_games WHERE GameId = ?', id)
            .then(res => {
                var promises = [];
                res.forEach(element => {
                    promises.push(getGenreById(element.GameGenreId, db));
                });

                Promise.all(promises)
                    .then(results => {
                        resolve(results);
                    })
                    .catch(err => {
                        throw err;
                    });
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

function getGenreById(id, db) {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT Id, Name FROM game_genre WHERE Id = ?', id)
            .then(result => {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve(null);
                }
            })

            .catch(err => {
                reject(err);
            });
    });
}
