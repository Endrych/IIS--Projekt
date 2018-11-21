module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT GameId FROM GAME_GENRE_GAMES WHERE GameGenreId = ?', id)
            .then(gamesId => {
                resolve(gamesId);
            })
            .catch(err => {
                throw err;
            });
    });
};
