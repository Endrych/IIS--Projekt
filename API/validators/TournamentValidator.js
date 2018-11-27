const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    addTournamentValidation: tournament => {
        if (tournament && typeof tournament === 'object') {
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
                        required: true
                    }
                },
                tournament
            );
        } else {
            return false;
        }
    }
};
