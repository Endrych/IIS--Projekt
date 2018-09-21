module.exports = app => {
	app.get('*', (req, res) => {
		console.log('Error handle')
		res.sendStatus(404);
	});
};
