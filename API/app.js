const express = require('express');
const app = express();

const port = process.env.port || 5050
const middlewares = require('./middlewares/Middlewares')
const controllers = require('./controllers/Controllers');

middlewares(app);
controllers(app);

app.listen(port, () => {
	console.log('Connected');
});