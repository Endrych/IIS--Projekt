const ValidatorsEnum = require('./ValidatorsEnum');
const minValidator = require('./Basic/MinValidator');
const maxValidator = require('./Basic/MaxValidator');
const rangeValidator = require('./Basic/RangeValidator');
const alphaNumericValidator = require('./Basic/AlphaNumericValidator');
const equalValueValidator = require('./Basic/EqualValueValidator');
const alphaCharactersValidator = require('./Basic/AlphaCharactersValidator');
const phoneValidator = require('./Basic/PhoneValidator');
const emailValidator = require('email-validator');
const dateValidator = require('./Basic/DateValidator');
const youtubeValidator = require('youtube-validator');
const imageValidator = require('is-base64');

module.exports = (validatorsOptionObject, obj) => {
    var valid = true;
    if (obj && typeof obj === 'object' && validatorsOptionObject && typeof validatorsOptionObject === 'object') {
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            var value = obj[key];
            var validatorsOptions = validatorsOptionObject[key];

            if (!validatorsOptions) {
                return false;
            }

            if (!value && validatorsOptions.required) {
                return false;
            }

            if (value) {
                if (validatorsOptions.validators && typeof validatorsOptions.validators === 'object') {
                    var validators = validatorsOptions.validators;
                    for (var i = 0, len = validators.length; i < len; i++) {
                        var validator = validators[i];
                        if (!valid) break;
                        switch (validator.validator) {
                            case ValidatorsEnum.MIN:
                                if (!minValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.MAX:
                                if (!maxValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.RANGE:
                                if (!rangeValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.ALPHANUMERIC:
                                if (!alphaNumericValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.EQUAL_VALUE:
                                if (!equalValueValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.ALPHA_CHARACTERS:
                                if (!alphaCharactersValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.PHONE:
                                if (!phoneValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.EMAIL:
                                if (!emailValidator.validate(value)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.DATE:
                                if (!dateValidator(value, validator.options)) {
                                    valid = false;
                                }
                                break;
                            case ValidatorsEnum.YOUTUBE:
                                youtubeValidator.validateUrl(value, (res, err) => {
                                    if (err) {
                                        valid = false;
                                    }
                                });
                                break;
                            case ValidatorsEnum.IMAGE:
                                if (!imageValidator(value)) {
                                    valid = false;
                                }
                                break;
                            default:
                                valid = false;
                        }
                    }
                }
            }
        }
        return valid;
    } else {
        return false;
    }
};
