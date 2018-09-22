const validator = require('../../../validators/Basic/MaxValidator');
const assert = require('assert');

describe('MaxLengthValidator', () => {
	it('Should return false on string test and max 2', function() {
		assert.equal(validator('test', { max: 2 }), false);
	});

	it('Should return true on string test and max 4', function() {
		assert.equal(validator('test', { max: 4 }), true);
	});

	it('Should return true on bool true and max 4', function() {
		assert.equal(validator(true, { max: 4 }), true);
	});

	it('Should return false on bool true and max 3', function() {
		assert.equal(validator(true, { max: 3 }), false);
	});

	it('Number in range', function() {
		assert.equal(validator(3, { max: 3 }), true);
	});

	it('Number bigger', function() {
		assert.equal(validator(4, { max: 3 }), false);
	});

	it('Without options', function() {
		assert.equal(validator(true), false);
	});

	it('Empty options', function() {
		assert.equal(validator('test', {}), false);
	});
});
