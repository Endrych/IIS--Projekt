module.exports = (body, nickname, db) => {
    new Promise((resolve, reject) => {
        db.promiseQuery('UPDATE User SET ? WHERE Nickname = ?', [body, nickname])
            .then(_ => {
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};
