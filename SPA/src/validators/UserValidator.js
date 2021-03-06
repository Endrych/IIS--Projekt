const validateObject = require("./ValidateObject");
const ValidatorsEnum = require("./ValidatorsEnum");
const registrationFields = require("../enums/registrationFields")

module.exports = {
	registerValidation: user => {
		if (user && typeof user === "object") {
			return validateObject([
				{
					name: "Nickname",
					value: user.Nickname,
					validators: [
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
					name: "Firstname",
					value: user.Firstname,
					validators: [
						{
							validator: ValidatorsEnum.ALPHA_CHARACTERS,
							options: {
								allowSpace: true
							}
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
					name: "Lastname",
					value: user.Lastname,
					validators: [
						{
							validator: ValidatorsEnum.ALPHA_CHARACTERS,
							options: {
								allowSpace: true
							}
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
					name: "Password",
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
					name: "Nickname",
					value: user.Phone,
					validators: [
						{
							validator: ValidatorsEnum.PHONE
						}
					],
					required: false
				},
				{
					name: registrationFields.default.EMAIL,
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
		if (login && typeof login === "object") {
			return validateObject([
				{
					value: login.Nickname,
					validators: [
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
