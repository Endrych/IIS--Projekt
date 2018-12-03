const fs = require('fs')

module.exports = (res, error) =>{
    if (error.error) {
        console.log(error.error);
        fs.appendFile('log.txt',JSON.stringify(error.error,null,4));
    }
    res.sendStatus(error.status);
}