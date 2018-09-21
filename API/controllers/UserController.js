const db = require('../config/DbConnection');
const bcrypt = require('bcrypt');
const UserValidator = require('../validators/UserValidator');

module.exports = app => {
	app.post('/user/register', (req, res) => {
		var body = req.body;
		if (UserValidator.registerValidation(body)) {
            bcrypt.genSalt().then(salt=>{
                bcrypt.hash(body.Password,salt,(err,hash)=>{
                    if (err){
                        res.sendStatus(500);
                    }else{
                        delete body.PasswordConfirm;
                        body.Password = hash;
                        body.Salt = salt;
                        db.query('INSERT INTO USER SET ?', body, (err, result) => {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });
                    }
                })
            })
		} else {
			res.sendStatus(400);
		}
	});
};
