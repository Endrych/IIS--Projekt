module.exports = (value, options) => {
	if (value) {
		if (options && options.allowSpace) {
			return /^[\w|\s]+$/.test(value);
		} else {
			return /^\w+$/.test(value);
		}
	} else {
		return false;
	}
};
