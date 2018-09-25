const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const gameValidator = require('../validators/GameValidator');

module.exports = app => {
	app.get('/games', (req, res) => {
		db.query('SELECT Id, Name FROM GAME', (err, res) => {
			if (err) {
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			console.log(res);
		});
		res.send(new Result(ResultCodes.OK));
	});

	app.post('/games', (req, res) => {
		var body = req.body;
		if (gameValidator.addGameValidation(body)) {
			db.query('SELECT Id FROM Game WHERE ?', { Keyname: body.Keyname }, (err, result) => {
				if (result.length === 0) {
					db.query('INSERT INTO GAME SET ?', body, (err, result) => {
						if (err) {
							res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
						} else {
							res.send(new Result(ResultCodes.OK, result.insertId));
						}
					});
				} else {
					res.send(new Result(ResultCodes.SEE_OTHER));
				}
			});
		} else {
			res.send(new Result(ResultCodes.BAD_REQUEST));
		}
	});
};
