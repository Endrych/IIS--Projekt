const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    addGameValidation: game => {
        if (game && typeof game === 'object') {
            return validateObject([
                {
                    value: game.Name,
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
                    value: game.Keyname,
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
                    value: game.Publisher,
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
                {
                    value: game.ReleaseDate,
                    validators: [
                        {
                            validator: ValidatorsEnum.DATE
                        }
                    ],
                    required: false
                },
                {
                    value: game.Image,
                    validators: [
                        {
                            validator: ValidatorsEnum.IMAGE
                        }
                    ],
                    required: false
                },
                {
                    value: game.Icon,
                    validators: [
                        {
                            validator: ValidatorsEnum.IMAGE
                        }
                    ],
                    required: false
                },
                {
                    value: game.Video,
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
            ]);
        } else {
            return false;
        }
    }
};
