import emailValidator from 'email-validator';

class GeneralValidators{
	AlphaCharacters = (value, options) => {
		if (value) {
			if (options && options.allowSpace) {
				return /^[a-zA-Z|\s]+$/.test(value);
			} else {
				return /^[a-z|A-Z]+$/.test(value);
			}
		} else {
			return false;
		}
	}

	AlphaNumericCharacters = (value, options) => {
		if (value) {
			if (options && options.allowSpace) {
				return /^[\w|\s]+$/.test(value);
			} else {
				return /^\w+$/.test(value);
			}
		} else {
			return false;
		}
	}

	EqualValue = (value, options) => {
		if (options) {
			var sameValue = options.value
			if(sameValue){
				return value == sameValue;
			}else{
				return value == null;
			}
		} else {
			if (value) {
				return false;
			} else {
				return true;
			}
		}
	}

	Max =  (value, options) => {
		var max = 0;

		if (options) {
			if (options.max) {
				max = options.max;
			}
		}

		if (typeof value !== 'number') {
			value = value.toString().length;
		}

		if (value <= max) {
			return true;
		}

		return false;
	}

	Min = (value, options) => {
		var min = 0;

		if (options) {
			if (options.min) {
				min = options.min;
			}
		}
		if (typeof value !== 'number') {
			if(value !== undefined){
				value = value.toString().length;
			}else{
				value = 0;
			}
		}

		if (value >= min) {
			return true;
		}

		return false;
	};

	PhoneNumber= (value, options) => {
		return true;
	};

	Email = (value,options)=>{
		if (!emailValidator.validate(value)) {
			return false;
		}
		return true;
	}

	Range =  (value, options) => {
		var min = 0;
		var max = 0;
		if (value) {
			if (options) {
				if (options.min) {
					min = options.min;
				}
				if (options.max) {
					max = options.max;
				}
			}

			if (typeof value !== 'number') {
				value = value.toString().length;
			}
			return min <= value && value <= max;
		} else {
			return false;
		}
	};


}

export default GeneralValidators;