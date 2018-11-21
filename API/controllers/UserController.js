const ResultCodes = require('../enums/ResultCodes');
const userValidator = require('../validators/UserValidator');
const updateUserToDb = require('../helpers/UsersHelpers/updateUserToDb');
const getPublicUserProfile = require('../helpers/UsersHelpers/getPublicUserProfile');
const processError = require('../helpers/processError');

module.exports = app => {
    const db = app.db;

    app.get('/user', (req, res) => {
        if (req.user) {
            var user = req.user;
            delete user.Password;
            delete user.Salt;
            res.send(req.user);
        } else {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
        }
    });

    app.get('/user/:nickname', (req, res) => {
        var nickname = req.params.nickname;

        getPublicUserProfile(db, nickname)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.put('/user/edit', (req, res) => {
        if (!req.user) {
            res.sendStatus(ResultCodes.UNAUTHORIZED);
            return;
        }

        if (!userValidator.editValidation(req.body)) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        updateUserToDb(req.body, req.user.Nickname, db)
            .then(_ => {
                res.sendStatus(ResultCodes.OK);
            })
            .catch(err => {
                processError(res, err);
            });
    });
};
