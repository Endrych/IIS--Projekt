module.exports = (req, res, next) => {
	console.log('Header middleware')
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
	);

    next();
}