import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RegisterReducer from './reducer_register';
import LoginReducer from './reducer_login';
import UserInformationsReducer from './reducer_user_informations';
import ArticlesAllReducer from './reducer_articles_all';
import ArticleInfoReducer from './reducer_article_info';
import PlayerInformationReducer from './reducer_player_info';
import ReducerGameList from './reducer_game_list';
import ReducerGameInfo from './reducer_game_info';
import ReducerGrantRights from './reducer_grant_rights';
import ReducerTeamInfo from './reducer_team_info';

const rootReducer = combineReducers({
	registrationResultCode: RegisterReducer,
	loginStatus: LoginReducer,
	userInformations: UserInformationsReducer,
	playerInfo: PlayerInformationReducer,
	articlesAll: ArticlesAllReducer,
	articleInfo: ArticleInfoReducer,
	gameList: ReducerGameList,
	gameInfo: ReducerGameInfo,
	grantRights: ReducerGrantRights,
	teamInfo: ReducerTeamInfo,
	form: formReducer
});

export default rootReducer;