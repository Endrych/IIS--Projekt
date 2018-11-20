module.exports = (user, hash, salt, db) => {
    return new Promise((resolve, reject) => {
        user.Password = hash;
        user.Salt = salt;
        user.Admin = 0;

        db.promiseQuery('INSERT INTO USER SET ?', user)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                throw err;
            });
    });
};
