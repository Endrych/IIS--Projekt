const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');
const generateRound = require('./generateRound');

module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM tournament WHere Id = ?', id)
            .then(tournament => {
                if (tournament.length === 0) {
                    reject(new RejectError(ResultCodes.NO_CONTENT));
                    return;
                }
                tournament = tournament[0];

                if (tournament.State !== 1) {
                    resolve('Bad state of tournament');
                    return;
                }

                db.promiseQuery(
                    `SELECT * FROM tournament_match JOIN tmatch ON tournament_match.tmatch = tmatch.id WHERE Round = ? And tournament=${id}`,
                    tournament.Round
                ).then(matches => {
                    if (matches.length > 1) {
                        var users = [];
                        var correct = true;
                        matches.forEach(element => {
                            if (correct) {
								if (element.Score1 !== null) {
                                    if (element.Score1 > element.Score2) {
                                        users.push(element.User1);
                                    } else {
                                        users.push(element.User2);
                                    }
                                } else {
                                    correct = false;
                                }
                            }
                        });
                        if (correct) {
                            db.promiseBeginTransaction()
                                .then(() => {
                                    generateRound(users, tournament.Round + 1, id, db)
                                        .then(() => {
                                            db.commit();
                                            resolve('Round generated');
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
                            resolve('Not done');
                        }
                    } else {
                        var match = matches[0];
                        if (match.Score1 !== null && match.Score2 != null) {
                            var winner = match.User1;
                            if (match.Score2 > match.Score1) {
                                winner = match.User2;
                            }
                            db.promiseQuery('UPDATE tournament SET ? Where Id = ?', [{ Winner: winner, State: 2 }, id])
                                .then(() => {
                                    resolve('Tournament completed');
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        } else {
                            resolve('Not done');
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
