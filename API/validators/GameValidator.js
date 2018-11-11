const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    addGameValidation: game => {
        if (game && typeof game === 'object') {
            return validateObject({
                Name:{
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
                Keyname:{
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
                Publisher:{
                    validators: [
                        {
                            validator: ValidatorsEnum.MAX,
                            options: {
                                max: 255
                            }
                        }
                    ],
                    required: false
                },
                ReleaseDate:{
                    validators: [
                        {
                            validator: ValidatorsEnum.DATE
                        }
                    ],
                    required: false
                },
                Image:{
                    validators: [
                        {
                            validator: ValidatorsEnum.IMAGE
                        }
                    ],
                    required: false
                },
                Icon:{
                    validators: [
                        {
                            validator: ValidatorsEnum.IMAGE
                        }
                    ],
                    required: false
                },
                Video:{
                    validators: [
                        {
                            validator: ValidatorsEnum.MAX,
                            options: {
                                max: 255
                            }
                        },
                        {
                            validator: ValidatorsEnum.YOUTUBE
                        }
                    ],
                    required: false
                }
            },game);
        } else {
            return false;
        }
    }
};
