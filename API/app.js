const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const headerMiddleware = require('./middlewares/HeaderMiddleware');

app.use(bodyParser.json());
app.use(headerMiddleware);

const port = process.env.port || 5050

app.listen(port, () => {
	console.log('Connected');
});