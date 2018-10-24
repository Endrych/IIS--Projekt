const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');
const db = require('../config/dbconnection');

module.exports = app => {
	app.get('/game-genre',(req,res)=>{
		db.query('SELECT * FROM GAME_GENRE', (err,result)=>{
			if(err){
				console.log(err);
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			res.send(new Result(ResultCodes.OK,result))
		})
	});

	app.get('/game-genre/:name', (req, res) => {
		var name = req.params.name;

		db.query('SELECT Id FROM GAME_GENRE WHERE Name = ?', name, (err, result) => {
			if (err) {
				console.log(err);
				res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
			}
			if (result.length > 0) {
				db.query('SELECT GameId FROM GAME_GENRE_GAMES WHERE GameGenreId = ?', parseInt(result[0].Id), (err, result1) => {
					if (err) {
						console.log(err);
						res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
					}
					if (result1.length > 0) {
						db.query('SELECT Id, Name, Keyname, Icon FROM Game WHERE Deleted = 0 AND Id IN (' +
							Array(result1.length + 1).join('?').split('').join(',') + ')', result1.map(p => p.GameId), function (err, result_games) { 
								if (err) {
									console.log(err);
									res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
								}
								res.send(new Result(ResultCodes.OK, result_games))
							});
					} else {
						res.send(new Result(ResultCodes.OK,[]));
					}
				});
			} else {
				res.send(new Result(ResultCodes.NO_CONTENT));
			}
		});
	});
};
