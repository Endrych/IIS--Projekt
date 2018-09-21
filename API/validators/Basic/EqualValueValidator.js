module.exports = (value, options) => {
	if (options) {
		var sameValue = options.value
		if(sameValue){
			return value == sameValue;
		}else{
			return value == null;
		}
	} else {
		if (value) {
			return false;
		} else {
			return true;
		}
	}
};
