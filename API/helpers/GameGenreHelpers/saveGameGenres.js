module.exports = (gameId, genres, db) => {
    return new Promise((resolve, reject) => {
        if (genres) {
            var items = [];

            genres.forEach(element => {
                items.push([gameId, element]);
            });

            db.promiseQuery('INSERT INTO game_genre_games (GameId,GameGenreId) VALUES ?', [items])
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            resolve();
        }
    });
};
