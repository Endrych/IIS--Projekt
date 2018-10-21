const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');

module.exports = app => {
	app.get('/publisher/:id', (req, res) => {
		var id = req.params.id;
		db.query(
			'SELECT Id, Name, Keyname, Icon FROM GAME WHERE PublisherId = ? AND Deleted = 0 ',
			[id],
			(err, result) => {
				if (err) {
					res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
				} else {
					res.send(new Result(ResultCodes.OK, result));
				}
			}
		);
	});
};
