const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getUser = require('../helpers/AuthenticationHelpers/getUser');
const db = require('../config/dbconnection');
const ResultCodes =  require('../enums/ResultCodes.js');

module.exports = (req, res, next) => {
    var token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (!err) {
                getUser(decoded.id, db)
                    .then(user => {
                        if(user.Deactivated){
                            res.sendStatus(ResultCodes.METHOD_NOT_ALLOWED);
                        }else{
                            req.user = user;
                            next();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        next();
                    });
            }
        });
    } else {
        next();
    }
};
