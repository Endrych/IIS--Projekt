const BasicValidators = require('./BasicValidators');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
	registerValidation: user => {
		if (user) {
			return BasicValidators.validateObject([
				{
					value: user.Nickname,
					validators: [
						// TODO $,_- apod
						{
							validator: ValidatorsEnum.ALPHANUMERIC
						},
						{
							validator: ValidatorsEnum.RANGE,
							options: {
								min: 4,
								max: 45
							}
						}
					],
					required: true
				},
				{
					value: user.Firstname,
					validators: [
						{
							validator: ValidatorsEnum.ALPA_CHARACTERS
						},
						{
							validator: ValidatorsEnum.RANGE,
							options: {
								min: 1,
								max: 45
							}
						}
					],
					required: true
				},
				{
					value: user.Lastname,
					validators: [
						{
							validator: ValidatorsEnum.ALPA_CHARACTERS
						},
						{
							validator: ValidatorsEnum.RANGE,
							options: {
								min: 1,
								max: 45
							}
						}
					],
					required: true
				},
				{
					value: user.Password,
					validators: [
						{
							validator: ValidatorsEnum.ALPHANUMERIC
						},
						{
							validator: ValidatorsEnum.MIN_LENGTH,
							options: {
								min: 6
							}
						},
						{
							validator: ValidatorsEnum.EQUAL_VALUE,
							options: {
								value: user.PasswordConfirm
							}
						}
					],

					required: true
				},
				{
					value: user.Phone,
					validators: [
						{
							validator: ValidatorsEnum.PHONE
						}
					],
					required: false
				},
				{
					value: user.Email,
					validators: [
						{
							validator: ValidatorsEnum.EMAIL
						}
					],
					required: true
				}
			]);
		} else {
			return false;
		}
	},

	loginValidation: login => {
		return true;
	}
};
