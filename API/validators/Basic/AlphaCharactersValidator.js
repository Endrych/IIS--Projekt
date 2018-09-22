module.exports = (value, options) => {
	if (value) {
		if (options && options.allowSpace) {
			return /^[a-zA-Z|\s]+$/.test(value);
		} else {
			return /^[a-z|A-Z]+$/.test(value);
		}
	} else {
		return false;
	}
};
