module.exports = (value, options) => {
	var max = 0;

	if (options) {
		if (options.max) {
			max = options.max;
		}
	}

	if (typeof value !== 'number') {
		value = value.toString().length;
	}

	if (value <= max) {
		return true;
	}

	return false;
};
