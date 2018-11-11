const bodyParser = require('body-parser');
const headerMiddleware = require('./HeaderMiddleware');
const authenticationMiddleware = require('./AuthenticationMiddleware');

module.exports = (app) =>{
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(headerMiddleware);
    app.use(authenticationMiddleware);
}