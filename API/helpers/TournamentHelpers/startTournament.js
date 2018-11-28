const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');
const generateRound = require('./generateRound');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseBeginTransaction()
            .then(() => {
                Promise.all([
                    db.promiseQuery('SELECT * FROM Tournament WHERE Id = ?', id),
                    db.promiseQuery('SELECT UserId FROM tournament_user WHERE TournamentId = ?', id)
                ])
                    .then(results => {
                        var tournament = results[0];
                        var users = results[1];

                        if (tournament.length === 0) {
                            res.sendStatus(ResultCodes.NO_CONTENT);
                            return;
                        }

                        var usersObj = [];
                        users.forEach(element => {
                            usersObj.push(element.UserId);
                        });

                        generateRound(usersObj, 1, id, db)
                            .then(() => {
                                db.commit();
                                resolve();
                            })
                            .catch(err => {
                                db.promiseRollback();
                                reject(err);
                            });
                    })
                    .catch(err => {
                        db.promiseRollback();
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
