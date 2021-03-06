module.exports = (user, hash, salt, db) => {
    return new Promise((resolve, reject) => {
        user.Password = hash;
        user.Salt = salt;
        user.Admin = 0;

        db.promiseQuery('INSERT INTO user SET ?', user)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });
};
