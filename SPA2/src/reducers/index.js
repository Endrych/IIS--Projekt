import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './reducer_register';

const rootReducer = combineReducers({
	registrationResultCode: RegisterReducer,
	form: formReducer
});

export default rootReducer;
