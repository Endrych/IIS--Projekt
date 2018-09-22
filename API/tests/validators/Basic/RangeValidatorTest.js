const validator = require('../../../validators/Basic/RangeValidator');
const assert = require('assert');

describe('MaxLengthValidator', () => {
	it('In range numbers', function() {
		assert.equal(validator(2, { min: 2, max: 4}), true);
	});

	it('In range numbers', function() {
		assert.equal(validator('test', { min: 2, max: 4}), true);
    });
    
    it('Not in range numbers', function() {
		assert.equal(validator(7, { min: 2, max: 4}), false);
	});

	it('Not in range numbers', function() {
		assert.equal(validator('tests', { min: 2, max: 4}), false);
	});

	it('Without options', function() {
		assert.equal(validator(true), false);
	});

	it('Empty options', function() {
		assert.equal(validator('test', {}), false);
    });
    
    it('Without value and  option', function() {
		assert.equal(validator(), false);
	});
});
