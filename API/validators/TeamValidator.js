const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    addTeamValidation: team => {
        if (team && typeof team === 'object') {
            return validateObject([
                {
                    value: team.Name,
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
                    value: team.Owner,
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
                    value: team.Logo,
                    validators: [
                        {
                            validator: ValidatorsEnum.IMAGE
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
