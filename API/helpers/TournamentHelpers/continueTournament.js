const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');
const generateRound = require('./generateRound');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM Tournament WHere Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                tournament = tournament[0];

                if (tournament.State !== 1) {
                    reject(new RejectError(ResultCodes.METHOD_NOT_ALLOWED));
                    return;
                }

                db.promiseQuery(
                    'SELECT * FROM tournament_match JOIN tmatch ON tournament_match.tmatch = tmatch.id WHERE Round = ?',
                    tournament.Round
                ).then(matches => {
                    if (matches.length > 1) {
                        var users = [];
                        matches.forEach(element => {
                            if (element.Score1) {
                                if (element.Score1 > element.Score2) {
                                    users.push(element.User1);
                                } else {
                                    users.push(element.User2);
                                }
                            } else {
                                reject(ResultCodes.FORBIDDEN);
                                return;
                            }
                        });

                        db.promiseBeginTransaction()
                            .then(() => {
                                generateRound(users, tournament.Round + 1, id, db)
                                    .then(() => {
                                        db.commit();
                                        resolve(ResultCodes.CREATED);
                                    })
                                    .catch(err => {
                                        db.rollback();
                                        reject(err);
                                    });
                            })
                            .catch(err => {
                                reject(err);
                            });
                    } else {
                        var match = matches[0];

                        if (match.Score1 && match.Score2) {
                            var winner = match.User1;
                            if (match.Score2 > match.Score1) {
                                winner = match.User2;
                            }
                            db.promiseQuery('UPDATE Tournament SET ? Where Id = ?', [{ Winner: winner, State: 3 }, id])
                                .then(() => {
                                    resolve(ResultCodes.OK);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        } else {
                            reject(new RejectError(ResultCodes.FORBIDDEN));
                            return;
                        }
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};
