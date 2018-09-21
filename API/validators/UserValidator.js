const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
	registerValidation: user => {
		if (user && typeof user === 'object') {
			return validateObject([
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
							validator: ValidatorsEnum.ALPHA_CHARACTERS
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
							validator: ValidatorsEnum.ALPHA_CHARACTERS
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
							validator: ValidatorsEnum.MIN,
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
		if (login && typeof login === 'object') {
			return validateObject([
				{
					value: login.Nickname,
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
					value: login.Password,
					validators: [
						{
							validator: ValidatorsEnum.ALPHANUMERIC
						},
						{
							validator: ValidatorsEnum.MIN,
							options: {
								min: 6
							}
						}
					],

					required: true
				}
			]);
		} else {
			return false;
		}
	}
};
