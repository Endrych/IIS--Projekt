const ValidatorsEnum = require('./ValidatorsEnum');
const minValidator = require('./Basic/MinValidator');
const maxValidator = require('./Basic/MaxValidator');
const rangeValidator = require('./Basic/RangeValidator');
const alphaNumericValidator = require('./Basic/AlphaNumericValidator');
const equalValueValidator = require('./Basic/EqualValueValidator');
const alphaCharactersValidator = require('./Basic/AlphaCharactersValidator');
const phoneValidator = require('./Basic/PhoneValidator');
const emailValidator = require('email-validator');

module.exports = obj => {
	var valid = true;
	if (obj && typeof obj === 'object') {
		obj.forEach(element => {
			if (element.value) {
				if (element.validators && typeof element.validators === 'object') {
					var validators = element.validators;
					for (var i = 0, len = validators.length; i < len; i++) {
						var validator = validators[i];

						switch (validator.validator) {
							case ValidatorsEnum.MIN:
								if (!minValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.MAX:
								if (!maxValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.RANGE:
								if (!rangeValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.ALPHANUMERIC:
								if (!alphaNumericValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.EQUAL_VALUE:
								if (!equalValueValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.ALPHA_CHARACTERS:
								if (!alphaCharactersValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.PHONE:
								if (!phoneValidator(element.value, validator.options)) {
									valid = false;
								}
								break;
							case ValidatorsEnum.EMAIL:
								if (!emailValidator.validate(element.value)) {
									valid = false;
								}
								break;
							default:
								valid = false;
						}
					}
				}
			} else {
				if (element.required) {
					valid = false;
				}
			}
		});
		return valid;
	} else {
		return false;
	}
};
