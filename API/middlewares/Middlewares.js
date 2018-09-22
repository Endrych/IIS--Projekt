const bodyParser = require('body-parser');
const headerMiddleware = require('./HeaderMiddleware');

module.exports = (app) =>{
    app.use(bodyParser.json());
    app.use(headerMiddleware);
}