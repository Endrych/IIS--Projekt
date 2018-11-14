const jwt = require('jsonwebtoken');
const config = require('../config/config');
const getUser = require('../helpers/getUser');

module.exports = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (!err) {
                getUser(decoded.id).then(user=>{
                    req.user = user;
                    next();
                }).catch(err=>{
                    console.log(err);
                    next()
                });
            }
        });
    }else{
        next();
    }
};