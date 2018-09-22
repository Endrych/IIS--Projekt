const db = require('../config/DbConnection');
const bcrypt = require('bcrypt');
const UserValidator = require('../validators/UserValidator');
const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');

module.exports = app => {
	app.post('/user/register', (req, res) => {
		var body = req.body;
		if (UserValidator.registerValidation(body)) {
			db.query('SELECT Nickname FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
				if (result.length === 0) {
					bcrypt.genSalt().then(salt => {
						bcrypt.hash(body.Password, salt, (err, hash) => {
							if (err) {
								res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
							} else {
								delete body.PasswordConfirm;
								body.Password = hash;
								body.Salt = salt;
								db.query('INSERT INTO USER SET ?', body, (err, result) => {
									if (err) {
										res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
									} else {
										res.send(new Result(ResultCodes.OK));
									}
								});
							}
						});
					});
				} else {
					res.send(new Result(ResultCodes.SEE_OTHER));
				}
			});
		} else {
			res.send(new Result(ResultCodes.BAD_REQUEST));
		}
	});

	app.post('/user/login', (req, res) => {
		var body = req.body;
		if (body) {
			if (UserValidator.loginValidation(body)) {
				db.query('SELECT Password, Salt FROM USER WHERE ?', { Nickname: body.Nickname }, (err, result) => {
					if(result.length > 0){
						var dbUser = result[0];
						bcrypt.hash(body.Password,dbUser.Salt,(err,hash)=>{
							if(err){
								res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR));
							}else{
								if(hash === dbUser.Password){
									res.send(new Result(ResultCodes.OK));
								}else{
									res.send(new Result(ResultCodes.BAD_REQUEST))
								}
							}
						})
					}else{
						res.send(new Result(ResultCodes.BAD_REQUEST))
					}
				});
			} else {
				res.send(new Result(ResultCodes.BAD_REQUEST));
			}
		} else {
			res.send(new Result(ResultCodes.BAD_REQUEST));
		}
	});
};
