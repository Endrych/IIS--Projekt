const ValidatorsEnum = require('./ValidatorsEnum')

module.exports = {
    minLength(string,min){
        if(string){
            if(string.length >= min){
                return true;
            }
            else{
                return false;
            }
        }else{
            return false;
        }
    },
    validateObject(obj){
        obj.forEach(element => {
        });
    }
}