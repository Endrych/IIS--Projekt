const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
	addArticleValidation: article => {
		if (article && typeof article === 'object') {
			return validateObject([
				{
					value: article.Author,
					validators: [
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
					value: article.Header,
					validators: [
						{
							validator: ValidatorsEnum.RANGE,
							options: {
								min: 1,
								max: 255
							}
						}
					],
					required: true
				},
				{
					value: article.Content,
					validators: [
						{
							validator: ValidatorsEnum.RANGE,
							options: {
                                min: 1,
                                max: 65535
							}
						}
					],
					required: true
				},				
				{
					value: article.Created,
					validators: [
						{
							validator: ValidatorsEnum.DATE
						}
					],
					required: true
				},
				{
					value: article.Image,
					validators: [
						{
							validator: ValidatorsEnum.IMAGE,
						}
					],
					required: false
				},
				{
					value: article.Game,
					validators: [
						{
                            validator: ValidatorsEnum.MIN,
                            options:{
                                min: 1
                            }
						}
					],
					required: true
				},
				
			]);
		} else {
			return false;
		}
	}
};
