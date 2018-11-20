const selectAllGameGenres = require('../helpers/GameGenreHelpers/selectAllGameGenres');
const processError = require('../helpers/processError');
const selectGameGenre = require('../helpers/GameGenreHelpers/selectGameGenre');
const selectGamesIdByGameGenre = require('../helpers/GameGenreHelpers/selectGamesIdByGameGenreId');
const getGamesByIds = require('../helpers/GameHelpers/getGamesByIds');

module.exports = app => {
    const db = app.db;

    app.get('/genres', (req, res) => {
        selectAllGameGenres(db)
            .then(genres => {
                res.send(genres);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/genres/:name', (req, res) => {
        var name = req.params.name;

        selectGameGenre(name, db)
            .then(id => {
                selectGamesIdByGameGenre(id, db)
                    .then(ids => {
                        getGamesByIds(ids)
                            .then(games => {
                                res.send(games);
                            })
                            .catch(err => {
                                throw err;
                            });
                    })
                    .catch(err => {
                        throw err;
                    });
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
