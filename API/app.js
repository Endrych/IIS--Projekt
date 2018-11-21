const express = require('express');
const app = express();
const db = require('./config/dbconnection');

const port = process.env.port || 5050
const middlewares = require('./middlewares/Middlewares')
const controllers = require('./controllers/Controllers');

app.db = db;

middlewares(app);
controllers(app);

app.listen(port, () => {
	console.log('Connected');
});