import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './reducer_register';
import LoginReducer from './reducer_login';
import UserInformationsReducer from './reducer_user_informations';
import ArticlesAllReducer from './reducer_articles_all';

const rootReducer = combineReducers({
	registrationResultCode: RegisterReducer,
	loginStatus: LoginReducer,
	userInformations: UserInformationsReducer,
	articlesAll: ArticlesAllReducer,
	form: formReducer
});

export default rootReducer;
