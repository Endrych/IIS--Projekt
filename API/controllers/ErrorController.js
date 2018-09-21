module.exports = app => {
	app.get('*', (req, res) => {
		res.sendStatus(404);
	});
};
