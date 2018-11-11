const bcrypt = require('bcryptjs');

function getSalt(salt) {
    return new Promise((resolve, reject) => {
        if (salt) {
            resolve(salt);
        } else {
            bcrypt
                .genSalt()
                .then(salt => {
                    resolve(salt);
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
}

module.exports = (password, salt) => {
    return new Promise((resolve, reject) => {
        getSalt(salt)
            .then(salt => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ hash, salt });
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};
