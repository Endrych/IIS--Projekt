const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');
const savePublisher = require('../PublisherHelpers/savePublisher');
const getGameByKeyname = require('../GameHelpers/getGameByKeyname');
const saveGameGenres = require('../GameGenreHelpers/saveGameGenres');

module.exports = (game, db) => {
    return new Promise((resolve, reject) => {
        var genres = game.Genres;
        delete game.Genres;

        getGameByKeyname(game.Keyname, db)
            .then(exists => {
                if (exists) {
                    reject(new RejectError(ResultCodes.SEE_OTHER));
                    return;
                }

                db.promiseBeginTransaction()
                    .then(() => {
                        savePublisher(game.Publisher, db)
                            .then(publisherId => {
                                delete game.Publisher;
                                game.PublisherId = publisherId;
                                saveGame(game, genres, db)
                                    .then(() => {
                                        db.commit();
                                        resolve(game.Keyname);
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
            })
            .catch(err => reject(err));
    });
};

function saveGame(game, genres, db) {
    return new Promise((resolve, reject) => {
        game.Deleted = 0;
        db.promiseQuery('INSERT INTO game SET ?', game)
            .then(result => {
                saveGameGenres(result.insertId, genres, db)
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
            .catch(err => reject(err));
    });
}
