const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const gameValidator = require('../validators/GameValidator');

module.exports = app => {
	function saveGameGenreGameTableData(id, data) {
		return new Promise((resolve, reject) => {
			var item = [];
			data.forEach(element => {
				item.push([id, element]);
			});

			db.query('INSERT INTO game_genre_games (GameId,GameGenreId) VALUES ?', [item], (err, result) => {
				if (err) {
					console.log(err);
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

	app.get('/games', (req, res) => {
		db.query('SELECT Id, Name FROM GAME', (err, res1) => {
			if (err) {
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			console.log(res1);
			res.send(new Result(ResultCodes.OK,res1));
		});
	});

	app.post('/games', (req, res) => {
		var body = req.body;
		var genres = body.Genres;
		delete body.Genres;
		if (gameValidator.addGameValidation(body)) {
			db.beginTransaction(err => {
				if (err) {
					throw err;
				}
				db.query('SELECT Id FROM Game WHERE ?', { Keyname: body.Keyname }, (err, result) => {
					if (result.length === 0) {
						db.query('SELECT Id FROM Publisher WHERE ?', { Name: body.Publisher }, (err, result) => {
							if (result.length !== 0) {
								delete body.Publisher;
								body.PublisherId = result[0].Id;
								db.query('INSERT INTO GAME SET ?', body, (err, result) => {
									if (err) {
										console.log(err);
										db.rollback();
										res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
									} else {
										saveGameGenreGameTableData(result.insertId, genres)
											.then(result => {
												if (result) {
													db.commit();
													res.send(new Result(ResultCodes.OK, result.insertId));
												} else {
													db.rollback();
													res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
												}
											})
											.catch(error => res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR)));
									}
								});
							} else {
								db.query('INSERT INTO Publisher SET ?', { Name: body.Publisher }, (err, result) => {
									if (err) {
										db.rollback();
									}
									body.PublisherId = result.insertId;
									delete body.Publisher;
									db.query('INSERT INTO GAME SET ?', body, (err, result) => {
										if (err) {
											console.log(err);
											db.rollback();
											res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
										} else {
											saveGameGenreGameTableData(result.insertId, genres)
												.then(result => {
													if (result) {
														db.commit();
														res.send(new Result(ResultCodes.OK, result.insertId));
													} else {
														db.rollback();
														res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
													}
												})
												.catch(error => console.log(error));
										}
									});
								});
							}
						});
					} else {
						db.rollback();
						res.send(new Result(ResultCodes.SEE_OTHER));
					}
				});
			});
		} else {
			res.send(new Result(ResultCodes.BAD_REQUEST));
		}
	});
};
