module.exports = (req, res, next) => {
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token'
	);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    next();
}