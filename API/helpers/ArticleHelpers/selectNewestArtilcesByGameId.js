module.exports = (gameId, count, offset, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM ARTICLE WHERE Deleted = 0 AND Game = ? order by Created DESC limit ?', [gameId, count + offset])
            .then(res => resolve(res.slice(offset)))
            .catch(err => {
                reject(err);
            });
    });
};
