const ResultCodes = require('../enums/ResultCodes');
const processError = require('../helpers/processError');
const TournamentValidator = require('../validators/TournamentValidator');
const insertTournament = require('../helpers/TournamentHelpers/insertTournament');

module.exports = app => {
    const db = app.db;

    app.post('/tournament', (req, res) => {
        var body = req.body;

        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (req.user.Admin === 0) {
            res.sendStatus(ResultCodes.FORBIDDEN);
            return;
        }

        if (!TournamentValidator.addTournamentValidation(body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        body.CreatedBy = req.user.Nickname;

        insertTournament(body, db)
            .then(teamId => {
                res.send(teamId.toString());
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
