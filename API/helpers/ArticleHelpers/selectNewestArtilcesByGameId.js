const solveArticlesGames = require('./solveArticlesGames');

module.exports = (gameId, count, offset, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery(
            'SELECT Id, Author, Header, Image, Game, Created FROM ARTICLE WHERE Deleted = 0 AND Game = ? order by Created DESC limit ?',
            [gameId, count + offset]
        )
            .then(res => {
                res = res.slice(offset);
                solveArticlesGames(res, db)
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
