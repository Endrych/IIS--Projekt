const getGamesByIds = require('../GameHelpers/getGamesByIds');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT GameId FROM GAME_GENRE_GAMES WHERE GameGenreId = ?', id)
            .then(gamesId => {
                if (gamesId.length === 0) {
                    resolve([]);
                    return;
                }
                
                getGamesByIds(gamesId, db)
                    .then(games => {
                        resolve(games);
                    })
                    .catch(err => {
                        resolve(res);
                    });
            })
            .catch(err => {
                throw err;
            });
    });
};
