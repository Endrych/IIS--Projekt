const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    articleValidation: article => {
        if (article && typeof article === 'object') {
            return validateObject(
                {
                    Header: {
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
                    Content: {
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
                    Image: {
                        validators: [
                            {
                                validator: ValidatorsEnum.IMAGE
                            }
                        ],
                        required: false
                    },
                    Game: {
                        validators: [
                            {
                                validator: ValidatorsEnum.MIN,
                                options: {
                                    min: 1
                                }
                            }
                        ],
                        required: false
                    }
                },
                article
            );
        } else {
            return false;
        }
    }
};
