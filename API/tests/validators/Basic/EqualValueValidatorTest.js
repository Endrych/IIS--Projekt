const validator = require('../../../validators/Basic/EqualValueValidator');
const assert = require('assert');

describe('MaxLengthValidator', () => {
	it('Equal values', function() {
		assert.equal(validator(2, { value: 2 }), true);
	});

	it('Not equal values', function() {
		assert.equal(validator('test', { value: 4 }), false);
	});

	it('Without options', function() {
		assert.equal(validator(true), false);
	});

	it('Empty options', function() {
		assert.equal(validator('test', {}), false);
    });
    
    it('Without value and  option', function() {
		assert.equal(validator(), true);
	});
});
