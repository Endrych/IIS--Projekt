const ValidatorsEnum = require('./ValidatorsEnum')

module.exports = {
    minLength(string,min = 0){
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
        if(obj){
            obj.forEach(element => {
            });
            return true;
        }else{
            return false;
        }
    }
}