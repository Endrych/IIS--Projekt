const errorController = require('./ErrorController');
const userController = require('./UserController');

module.exports = (app) =>{
    userController(app);
    errorController(app);
}