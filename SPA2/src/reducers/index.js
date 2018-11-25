import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './reducer_register';
import LoginReducer from './reducer_login';
import UserInformationsReducer from './reducer_user_informations';
import ArticlesAllReducer from './reducer_articles_all';
import ArticleInfoReducer from './reducer_article_info';
import PlayerInformationReducer from './reducer_player_info';
import ReducerGameList from './reducer_game_list';

const rootReducer = combineReducers({
	registrationResultCode: RegisterReducer,
	loginStatus: LoginReducer,
	userInformations: UserInformationsReducer,
	playerInfo: PlayerInformationReducer,
	articlesAll: ArticlesAllReducer,
	articleInfo: ArticleInfoReducer,
	gameList: ReducerGameList,
	form: formReducer
});

export default rootReducer;
