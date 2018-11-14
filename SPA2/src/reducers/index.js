import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './reducer_register';
import LoginReducer from './reducer_login';
import UserStatusReducer from './reducer_user_status';

const rootReducer = combineReducers({
	registrationResultCode: RegisterReducer,
	loginStatus: LoginReducer,
	// userStatus: UserStatusReducer, //zbytecne
	form: formReducer
});

export default rootReducer;
