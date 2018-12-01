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
import ReducerSendInvite from './reducer_send_invite';
import ReducerAllInvites from './reducer_all_invites';
import ReducerAllTournaments from './reducer_all_tournaments';
import ReducerTournamentInfo from './reducer_tournament_info';
import ReducerTournamentModal from './reducer_tournament_modal';
import ReducerTournamentStart from './reducer_tournament_start';
import ReducerSearchResults from './reducer_search_results';
import ReducerPlayerManagment from './reducer_manage_players';

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
	sendInviteInfo: ReducerSendInvite,
	userInvites: ReducerAllInvites,
	tournamentsAll: ReducerAllTournaments,
	tournamentInfo: ReducerTournamentInfo,
	tournamentModal: ReducerTournamentModal,
	tournamentStart: ReducerTournamentStart,
	searchResults: ReducerSearchResults,
	managePlayers: ReducerPlayerManagment,
	form: formReducer
});

export default rootReducer;