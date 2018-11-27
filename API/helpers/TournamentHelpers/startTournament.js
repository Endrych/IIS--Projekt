const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

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

                        var matches = [];
                        var matchCount = Math.ceil(users.length / 2);

                        for (var i = 0; i < matchCount; i++) {
                            var index = Math.floor(Math.random() * users.length);
                            var user1 = users[index].UserId;
                            users.splice(index, 1);
                            var user2 = null;

                            if (users.length > 0) {
                                var index = Math.floor(Math.random() * users.length);
                                user2 = users[index].UserId;
                                users.splice(index, 1);
                                matches.push([user1, user2, null, null]);
                            } else {
                                matches.push([user1, null, 1, 0]);
                            }
                        }

                        db.promiseQuery('INSERT INTO tmatch (User1,User2, Score1, Score2) VALUES ?', [matches])
                            .then(match => {
                                var firstId = match.insertId;
                                var tour_match = [];
                                for (var i = 0, len = matches.length; i < len; i++) {
                                    tour_match.push([id, firstId + i, 1]);
                                }
                                Promise.all([
                                    db.promiseQuery('UPDATE Tournament SET ? Where Id = ?', [
                                        { State: 1, Round: 1 },
                                        id
                                    ]),
                                    db.promiseQuery(
                                        'Insert INTO tournament_match (Tournament, TMatch, Round) VALUES ?',
                                        [tour_match]
                                    )
                                ])
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
                        db.promiseRollback();
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
};
