const solveArticlesGames = require('./solveArticlesGames');

module.exports = (count, offset, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery(
            'SELECT Id, Author, Header, Image, Game, Created FROM ARTICLE WHERE Deleted = 0 order by Created DESC limit ?',
            count + offset
        )
            .then(res => {
				res = res.slice(offset)
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
