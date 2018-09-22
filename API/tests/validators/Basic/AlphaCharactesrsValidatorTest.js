const validator = require('../../../validators/Basic/AlphaCharactersValidator');
const assert = require('assert');

describe('AlphaCharactersValidator', () => {
	it('Allow space', function() {
		assert.equal(validator('asdsadasd asdasdasd', { allowSpace: true }), true);
	});

	it('Without options correct text', function() {
		assert.equal(validator('test'), true);
	});

	it('Without options but spaces', function() {
		assert.equal(validator('teasdasd asdasdsa'), false);
	});

	it('With numbers', function() {
		assert.equal(validator('tes156t', {}), false);
    });
    
    it('With underscore', function() {
		assert.equal(validator('asdasd_asdasd'), false);
    });
    it('Empty value', function() {
		assert.equal(validator(''), false);
    });
    it('Null value', function() {
		assert.equal(validator(), false);
    });
    it('Special character', function() {
		assert.equal(validator('@$#'), false);
	});
});
