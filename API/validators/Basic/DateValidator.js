const moment = require('moment')

module.exports = (value, options) => {
	if (value) {
        return moment(value,moment.ISO_8601, true).isValid()
	} else {
		return false;
	}
};
