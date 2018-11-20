const ResultCodes = require('../enums/ResultCodes');
const selectAllPublishers = require('../helpers/PublisherHelpers/selectAllPublishers');
const processError = require('../helpers/processError');
const getGamesByPublisherId = require('../helpers/GameHelpers/getGamesByPublisherId');

module.exports = app => {
    var db = app.db;

    app.get('/publishers', (req, res) => {
        selectAllPublishers(db)
            .then(publishers => {
                res.send(publishers);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.get('/publisher/:id', (req, res) => {
        var id = req.params.id;
        getGamesByPublisherId(id)
            .then(games => {
                res.send(games);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
