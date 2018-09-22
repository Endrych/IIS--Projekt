const Result = require('../models/Result');
const ResultCodes = require('../enums/ResultCodes');

module.exports = app => {
	app.get('*', (req, res) => {
		res.send(new Result(ResultCodes.NOT_FOUND));
	});
};
