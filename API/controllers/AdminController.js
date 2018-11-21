const ResultCodes = require('../enums/ResultCodes');
const getAdminStateByNickname = require('../helpers/AdminHelpers/getAdminStateByNickname');
const setUserAdminState = require('../helpers/AdminHelpers/setUserAdminState');
const checkAdminEditPermission = require('../helpers/AdminHelpers/checkAdminEditPermission');
const processError = require('../helpers/processError');

module.exports = app => {
    const db = app.db;

    app.get('/admin/:nickname', (req, res) => {
        var nickname = req.params.nickname;

        getAdminStateByNickname(nickname, db)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                processError(res, err);
            });
    });

    app.post('/admin/:nickname', (req, res) => {
        var adminLevel = parseInt(req.query.level);
        var nickname = req.params.nickname;

        if (isNaN(adminLevel) || adminLevel < 0 || adminLevel > 1) {
            res.sendStatus(ResultCodes.BAD_REQUEST);
            return;
        }

        checkAdminEditPermission(req.user, nickname, db)
            .then(_ => {
                setUserAdminState(adminLevel, nickname, db)
                    .then(_ => {
                        res.sendStatus(ResultCodes.OK);
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