const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');
const gameValidator = require('../validators/GameValidator');
const processError = require('../helpers/processError');


module.exports = app => {
	function saveGameGenreGameTableData(id, data) {
		return new Promise((resolve, reject) => {
			var item = [];
			if(data){
				data.forEach(element => {
					item.push([id, element]);
				});
				db.query('DELETE FROM game_genre_games WHERE GameId = ?', [id], (err, res) => {
					if (err) {
						console.log(err);
						throw err;
					}
	
					db.query('INSERT INTO game_genre_games (GameId,GameGenreId) VALUES ?', [item], (err, result) => {
						if (err) {
							throw err;
						} else {
							resolve();
						}
					});
				});
			}else{
				resolve()
			}
		});
	}

	function getGamePublisher(id) {
		return new Promise((resolve, reject) => {
			if (id) {
				db.query('SELECT Name FROM PUBLISHER WHERE Id = ?', id, (err, result) => {
					if (err) {
						throw err;
					}

					if (result.length > 0) {
						resolve(result[0].Name);
					} else {
						resolve(null);
					}
				});
			} else {
				resolve(null);
			}
		});
	}

	function getGenreById(id) {
		return new Promise((resolve, reject) => {
			db.query('SELECT Name FROM game_genre WHERE Id = ?', id, (err, result) => {
				if (err) {
					throw err;
				}

				if (result.length > 0) {
					resolve(result[0].Name);
				} else {
					resolve(null);
				}
			});
		});
	}

	function getGameGenresId(id) {
		return new Promise((resolve, reject) => {
			db.query('SELECT GameGenreId FROM game_genre_games WHERE GameId = ?', id, (err, result) => {
				if (err) {
					throw err;
				}

				var promises = [];
				result.forEach(element => {
					promises.push(getGenreById(element.GameGenreId));
				});

				Promise.all(promises)
					.then(results => {
						resolve(results);
					})
					.catch(err => {
						throw err;
					});
			});
		});
	}

	function savePublisherToDb(name) {
		return new Promise((resolve, reject) => {
			if (name) {
				db.query('SELECT Id FROM Publisher WHERE ?', { Name: name }, (err, result) => {
					if (err) {
						throw err;
					}
					if (result.length !== 0) {
						resolve(result[0].Id);
					} else {
						db.query('INSERT INTO Publisher SET ?', { Name: name }, (err, result) => {
							if (err) {
								throw err;
							}
							resolve(result.insertId);
						});
					}
				});
			} else {
				resolve(null);
			}
		});
	}

	function saveGameToDb(body, genres) {
		return new Promise((resolve, reject) => {
			body.Deleted = 0;
			db.query('INSERT INTO GAME SET ?', body, (err, result) => {
				if (err) {
					throw err;
				} else {
					saveGameGenreGameTableData(result.insertId, genres)
						.then(result1 => {
							resolve();
						})
						.catch(error => {
							throw error;
						});
				}
			});
		});
	}

	app.get('/games/:id', (req, res) => {
		var id = req.params.id;
		db.query('SELECT * FROM GAME WHERE Keyname = ? AND Deleted = 0', id, (err, result) => {
			if (err) {
				console.log(err);
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			} else {
				if (result.length > 0) {
					var game = result[0];

					getGamePublisher(game.PublisherId)
						.then(result => {
							if (result) {
								game.Publisher = { Id: game.PublisherId, Name: result };
							}

							delete game.PublisherId;

							getGameGenresId(game.Id)
								.then(result => {
									game.Genres = result;
									res.send(new Result(ResultCodes.OK, game));
								})
								.catch(error => res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR)));
						})
						.catch(error => res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR)));
				} else {
					res.send(new Result(ResultCodes.NO_CONTENT));
				}
			}
		});
	});

	app.delete('/games/:id', (req, res) => {
		var id = req.params.id;
		db.query('UPDATE GAME SET Deleted = ? WHERE Keyname = ? AND Deleted = ?', [1, id, 0], (err, result) => {
			if (err) {
				console.log(err);
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			res.send(new Result(ResultCodes.OK));
		});
	});

	app.get('/games', (req, res) => {
		db.query('SELECT Id, Name, Keyname, Icon FROM GAME WHERE Deleted = 0', (err, res1) => {
			if (err) {
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			res.send(new Result(ResultCodes.OK, res1));
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
				db.query('SELECT Id FROM Game WHERE ? AND Deleted = 0', { Keyname: body.Keyname }, (err, result) => {
					if (result.length === 0) {
						savePublisherToDb(body.Publisher)
							.then(result => {
								delete body.Publisher;

								if (result) {
									body.PublisherId = result;
								}

								saveGameToDb(body, genres)
									.then(result => {
										db.commit();
										res.send(new Result(ResultCodes.OK, body.Keyname));
									})
									.catch(error => {
										db.rollback();
										res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
									});
							})
							.catch(err => {
								console.log(err);
								db.rollback();
								res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
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

	app.put('/games/:keyname', (req, res) => {
		var body = req.body;
		var id = req.params.keyname;
		if (gameValidator.addGameValidation(body)) {
			db.query('SELECT Id FROM GAME WHERE Keyname = ? AND DELETED = ?', [id, 0], (err, result0) => {
				if (err) {
					console.log(err);
					res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
				} else {
					if (result0.length === 0) {
						res.send(new Result(ResultCodes.NO_CONTENT));
					} else {
						var gameId = result0[0].Id;
						db.query(
							'SELECT Keyname FROM GAME WHERE Keyname = ? AND Deleted = ? AND Id <> ?',
							[body.Keyname, 0, gameId],
							(err, result) => {
								if (err) {
									console.log(err);
									res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
								} else {
									if (result.length === 0) {
										savePublisherToDb(body.Publisher)
											.then(result => {
												delete body.Publisher;
												if (result) {
													body.PublisherId = result;
												}
												saveGameGenreGameTableData(gameId, body.Genres)
													.then(result1 => {
														delete body.Genres;
														db.query(
															'UPDATE GAME SET ? WHERE Keyname = ? AND Deleted = ?',
															[body, id, 0],
															(err, result2) => {
																if (err) {
																	console.log(err);
																	res.send(
																		new Result(ResultCodes.INTERNAL_SERVER_ERROR)
																	);
																}
																res.send(new Result(ResultCodes.OK, body.Keyname));
															}
														);
													})
													.catch(error =>
														res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR))
													);
											})
											.catch(err => {
												res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
											});
									} else {
										res.send(new Result(ResultCodes.SEE_OTHER));
									}
								}
							}
						);
					}
				}
			});
		} else {
			res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
		}
	});
};
