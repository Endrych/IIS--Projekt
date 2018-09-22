module.exports = (value, options) => {
	var min = 0;
	var max = 0;
	if (value) {
		if (options) {
			if (options.min) {
				min = options.min;
			}
			if (options.max) {
				max = options.max;
			}
		}

		if (typeof value !== 'number') {
			value = value.toString().length;
		}
		return min <= value && value <= max;
	} else {
		return false;
	}
};
