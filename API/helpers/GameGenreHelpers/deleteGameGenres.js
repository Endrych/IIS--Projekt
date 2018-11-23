module.exports = (gameId, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('DELETE FROM game_genre_games WHERE GameId = ?', gameId)
            .then(_ => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};
