module.exports = (ids, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery(
            'SELECT Id, Name, Keyname, Icon FROM Game WHERE Deleted = 0 AND Id IN (' +
                Array(ids.length + 1)
                    .join('?')
                    .split('')
                    .join(',') +
                ')',
            ids.map(p => p.GameId)
        )
            .then(games => {
                resolve(games);
            })
            .catch(err => {
                reject(err);
            });
    });
};
