const validator = require('email-validator');
const assert = require('assert');

describe('MaxLengthValidator', () => {
	it('Correct mail', function() {
		assert.equal(validator.validate('test1283@seznam.cz'), true);
	});

	it('Missing @', function() {
		assert.equal(validator.validate('tes.gmail.com'), false);
	});
});
