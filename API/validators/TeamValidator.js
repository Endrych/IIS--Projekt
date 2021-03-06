const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    addTeamValidation: team => {
        if (team && typeof team === 'object') {
            return validateObject(
                {
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
                        validators: [],
                        required: false
                    },
                    Logo: {
                        validators: [
                            {
                                validator: ValidatorsEnum.IMAGE
                            }
                        ],
                        required: false
                    }
                },
                team
            );
        } else {
            return false;
        }
    }
};
