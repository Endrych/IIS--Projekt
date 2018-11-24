const getGameForArticle = require('../GameHelpers/getGameForArticle');
const RejectError = require('../../models/RejectError');
const ResultCodes = require('../../enums/ResultCodes');

module.exports = (res, db) => {
    return new Promise((resolve, reject) => {
        var promises = [];
        var ids = [];

        res.forEach(element => {
            if (element.Game) {
                if (ids.indexOf(element.Game) === -1) {
                    promises.push(getGameForArticle(element.Game, db));
                    ids.push(element.Game);
                }
            }
        });

        if (promises !== []) {
            Promise.all(promises)
                .then(results => {
                    res.forEach(element => {
                        var index = ids.indexOf(element.Game);
                        if (index !== -1) {
                            var game = results[index];
                            element.Game = game;
                        }
                    });
                    resolve(res);
                })
                .catch(err => {
                    reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR, err));
                });
        } else {
            resolve(res);
        }
    });
};
