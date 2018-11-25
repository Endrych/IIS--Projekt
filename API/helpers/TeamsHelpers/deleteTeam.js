const updateUserToDb = require('../UsersHelpers/updateUserToDb')

module.exports = (id, nickname, db) => {
    return new Promise((resolve, reject) => {
        db.promiseBeginTransaction().then(()=>{
            db.promiseQuery('UPDATE TEAM SET Deleted= 1 WHERE Id = ? AND Deleted = 0',id)
                .then(() => {
                    updateUserToDb({Team: null},nickname,db).then(()=>{
                        db.commit();
                        resolve();
                    }).catch(err => {
                        db.promiseRollback();
                        reject(err);
                    });
                })
                .catch(err => {
                    db.promiseRollback();
                    reject(err);
                });
        }).catch(err=>{
            reject(err);
        })
    });
};



