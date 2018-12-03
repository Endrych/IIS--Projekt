const mysql = require('mysql');
const RejectError = require('../models/RejectError');
const ResultCodes = require('../enums/ResultCodes');

var options = {
    host: 'store4.rosti.cz',
    user: 'davidend_1474',
    database: 'davidend_1474',
    dateStrings: true
};

if (process.platform === 'win32') {
    options.password = '';
} else {
    options.password = '1dee8b36';
}

function handleDisconnect() {
    connection = mysql.createConnection(options); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {
        // The server is either down
        if (err) {
            // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else {
            // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
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

    connection.promiseBeginTransaction = () => {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) {
                    reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR, err));
                } else {
                    resolve();
                }
            });
        });
    };

    connection.promiseCommit = () => {
        return new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) {
                    reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR, err));
                } else {
                    resolve();
                }
            });
        });
    };

    connection.promiseRollback = () => {
        return new Promise((resolve, reject) => {
            connection.rollback(err => {
                if (err) {
                    reject(new RejectError(ResultCodes.INTERNAL_SERVER_ERROR, err));
                } else {
                    resolve();
                }
            });
        });
    };
}

handleDisconnect();

module.exports = connection;
