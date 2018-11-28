module.exports = (body, db) => {
    return new Promise((resolve, reject) => {
        body.Created = new Date();
        body.Round = 0;

        db.promiseQuery('INSERT INTO Tournament SET ?', body)
            .then(tournament => {
                resolve(tournament.insertId);
            })
            .catch(err => {
                reject(err);
            });
    });
};
