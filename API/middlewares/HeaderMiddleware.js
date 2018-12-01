module.exports = (req, res, next) => {
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token'
	);
	res.setHeader('Access-Control-Allow-Origin', 'https://rocky-eyrie-34868.herokuapp.com');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');

    next();
}