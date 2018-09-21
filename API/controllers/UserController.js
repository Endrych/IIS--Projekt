const db = require('../config/DbConnection');
const bcrypt = require('bcrypt');
const UserValidator = require('../validators/UserValidator');
const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');

module.exports = app => {
	app.post('/user/register', (req, res) => {
		var body = req.body;
		if (UserValidator.registerValidation(body)) {
			bcrypt.genSalt().then(salt => {
				bcrypt.hash(body.Password, salt, (err, hash) => {
					if (err) {
						res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR,null));
					} else {
						delete body.PasswordConfirm;
						body.Password = hash;
						body.Salt = salt;
						db.query('INSERT INTO USER SET ?', body, (err, result) => {
							if (err) {
								res.send(new Result(ResultCodes.INTERNAL_SERVER_ERROR,null));
							} else {
								res.send(new Result(ResultCodes.OK,null));
							}
						});
					}
				});
			});
		} else {
			res.send(new Result(ResultCodes.BAD_REQUEST,null));
		}
	});
};
