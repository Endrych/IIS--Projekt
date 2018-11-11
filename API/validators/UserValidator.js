const validateObject = require('./ValidateObject');
const ValidatorsEnum = require('./ValidatorsEnum');

module.exports = {
    registerValidation: user => {
        if (user && typeof user === 'object') {
            return validateObject(
                {
                    Nickname: {
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
                    Firstname: {
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
                    Lastname: {
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
                    Password: {
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
                    Phone: {
                        validators: [
                            {
                                validator: ValidatorsEnum.PHONE
                            }
                        ],
                        required: false
                    },
                    Email: {
                        validators: [
                            {
                                validator: ValidatorsEnum.EMAIL
                            }
                        ],
                        required: true
                    }
                },
                user
            );
        } else {
            return false;
        }
    },

    loginValidation: login => {
        if (login && typeof login === 'object') {
            return validateObject({
                Nickname: {
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
                Password: {
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
            },login);
        } else {
            return false;
        }
    }
};
