module.exports = (value, options) => {
	var min = 0;

	if (options) {
		if (options.min) {
			min = options.min;
		}
	}
	if (typeof value !== 'number') {
		value = value.toString().length;
	}

	if (value >= min) {
		return true;
	}

	return false;
};
