const validator = require('../../../validators/Basic/MinValidator');
const assert = require('assert');

describe('MinLengthValidator', () => {
	it('Should return false on string test and min 5', function() {
		assert.equal(validator('test', { min: 5 }), false);
	});

	it('Should return true on string test and min 4', function() {
		assert.equal(validator('test', { min: 4 }), true);
	});

	it('Should return true on bool true and min 4', function() {
		assert.equal(validator(true, { min: 4 }), true);
	});

	it('Should return false on bool true and min 5', function() {
		assert.equal(validator(true, { min: 5 }), false);
	});

	it('Number in range', function() {
		assert.equal(validator(6, { min: 3 }), true);
	});
	it('Number in range', function() {
		assert.equal(validator(3, { min: 3 }), true);
	});

	it('Number smaller', function() {
		assert.equal(validator(2, { min: 3 }), false);
	});

	it('Without options', function() {
		assert.equal(validator(true), true);
	});

	it('Empty options', function() {
		assert.equal(validator('test', {}), true);
	});
});
