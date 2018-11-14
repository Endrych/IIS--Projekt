const ResultCodes = require('../enums/ResultCodes');

module.exports = app => {
	app.get('*', (req, res) => {
		res.sendStatus(ResultCodes.NOT_FOUND);
	});
};
