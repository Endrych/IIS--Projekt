const mysql = require('mysql');
const RejectError = require('../models/RejectError');
const ResultCodes = require('../enums/ResultCodes');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iis-db',
    dateStrings: true,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected to Database...');
});

connection.promiseQuery = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, res) => {
            if (err) {
                reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR, err));
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = connection;
