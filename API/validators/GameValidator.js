const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

var basicObj = {
    Name: {
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
  
    Description: {
        validators: [
            {
                validator: ValidatorsEnum.MAX,
                options:{
                    max: 65535
                }
            }
        ],
        required: false
    },
    Publisher: {
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
    ReleaseDate: {
        validators: [
            {
                validator: ValidatorsEnum.DATE
            }
        ],
        required: false
    },
    Image: {
        validators: [
            {
                validator: ValidatorsEnum.IMAGE
            }
        ],
        required: false
    },
    Icon: {
        validators: [
            {
                validator: ValidatorsEnum.IMAGE
            }
        ],
        required: false
    },
    Video: {
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
    },
    Genres: {
        required: false
    }
}

module.exports = {
    addGameValidation: game => {
        if (game && typeof game === 'object') {
            return validateObject(
                {
                    Keyname: {
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
                    ...basicObj
                },
                game
            );
        } else {
            return false;
        }
    },
    updateValidation: game => {
        if (game && typeof game === 'object') {
            return validateObject(
                basicObj,
                game
            );
        } else {
            return false;
        }
    }
};
