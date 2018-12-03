const processError = require('../helpers/processError');

module.exports = app => {
    const db = app.db;

    app.get('/search', (req, res) => {
        var expression = req.query.expression.toLowerCase();

        var findUserPromise = db.promiseQuery(
            "SELECT Nickname FROM user Where LOWER(Nickname) REGEXP '(" + encodeURI(expression) + ")'"
        );
        var findTeamPromise = db.promiseQuery(
            "SELECT Id, Name FROM team Where Deleted = 0 AND LOWER(Name) REGEXP '(" + encodeURI(expression) + ")'"
        );
        var findTournamentPromise = db.promiseQuery(
            "SELECT Id, Name, State FROM tournament Where LOWER(Name) REGEXP '(" + encodeURI(expression) + ")'"
        );
        var findGamePromise = db.promiseQuery(
            "SELECT Id, Name, Keyname FROM game Where Deleted = 0 AND LOWER(Name) REGEXP '(" +
                encodeURI(expression) +
                ")'"
        );
        var findArticlePromise = db.promiseQuery(
            "SELECT Id, Author, Header, Game FROM article Where Deleted = 0 AND LOWER(Header) REGEXP '(" +
                encodeURI(expression) +
                ")'"
        );

        Promise.all([findUserPromise, findTeamPromise, findTournamentPromise, findGamePromise, findArticlePromise])
            .then(results => {
                var searchResults = {
                    Users: results[0],
                    Teams: results[1],
                    Games: results[3],
                    Tournaments: results[2],
                    Articles: results[4]
                };
                res.send(searchResults);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
