const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'iis-db',
	dateStrings: true,
	// socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('You are now connected to Database...');
});

module.exports = connection;
