module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT GameId FROM game_genre_games WHERE GameGenreId = ?', id)
            .then(gamesId => {
                resolve(gamesId);
            })
            .catch(err => {
                reject(err);
            });
    });
};
