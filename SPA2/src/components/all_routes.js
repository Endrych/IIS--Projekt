import React, { Component } from "react";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch, Route } from "react-router-dom";

import LandingPage from "./LandingPage/landing_page";
import RegistrationForm from "./Registration/registration_form.js";
import RegistrationSucess from "./Registration/registration_sucess.js";
import UserPrivateProfile from "./Profile/user_private_profile";
import UserPrivateEditInformations from "./Profile/user_private_edit_infromations";
import ArticleNew from "./Articles/article_new";
import ArticleNewSuccess from "./Articles/article_new_sucess";
import ArticlesShowAll from "./Articles/articles_show_all";
import ArticleListAdmin from "./Articles/articles_list_admin";
import ArticleEdit from "./Articles/article_edit";
import ArticleShow from "./Articles/article_show";
import UserPublicProfile from './Profile/user_public_profile';
import GameNew from './Games/game_new';
import GameAdminList from "./Games/game_admin_list";
import GameEdit from "./Games/game_edit";
import GameList from "./Games/game_list";
import GameShow from './Games/game_show';
import AdminGrantRights from './Admin/admin_grant_rights';
import TeamCreateNew from './Teams/team_create_new';
import TeamShow from './Teams/team_show';
import TeamEdit from './Teams/team_edit';

class Game extends Component {
	constructor(props) {
		super();
	}
	render() {
		return <h2>Hra {this.props.gametitle}</h2>;
	}
}


const PlayerList = () => {
	return <h2>Seznam hracu</h2>;
};

const Player = params => {
	return <h2>Hrac {params.playername}</h2>;
};

const About = () => {
	return <h2>O nas</h2>;
};

const TeamList = () => {
	return <h2>List tymu</h2>;
};

const Team = params => {
	return <h2>Team {params.teamname}</h2>;
};

const Contacts = () => {
	return <h2>Kontaktni udaje</h2>;
};

const TournamentList = () => {
	return <h2>List turnaji</h2>;
};

const Tournament = params => {
	return <h2>Turnaj {params.tournamentname} </h2>;
};

const NewsList = () => {
	return <h2>News List</h2>;
};

const NewsArticle = params => {
	return <h2>Article {params.articleid}</h2>;
};

class Match extends Component {
	constructor(props) {
		super(props);
	}
	//Nepouzivat WillMount depricaped od reactu 16.3
	render() {
		return (
			<h2>
				Zapas {this.props.matchname} v turnaji {this.props.tournamentname}
			</h2>
		);
	}
}

const RegistrationPage = () => {
	return <h2>Registrace</h2>;
};

const AllRoutes = () => {
	return (
		<Switch>
			<Route path="/" exact strict component={LandingPage} />
			<Route path="/about" exact strict component={About} />
			<Route path="/contacts" exact strict component={Contacts} />
			<Route path="/games" component={GameList} exact strict />
			{/* <Route to="/" component={LandingPage} exact strict /> */}
			<Route
				path="/games/:keyname"
				render={({ match, history }) => {
					return <GameShow history={history} keyname={match.params.keyname} />;
				}}
				exact
				strict
			/>
			<Route path="/user" component={UserPrivateProfile} exact strict />
			<Route path="/user/edit" component={UserPrivateEditInformations} exact strict />
			<Route path="/players" component={PlayerList} exact strict />
			<Route
				path="/players/:playername"
				render={({ match, history }) => {
					return <UserPublicProfile history={history} playername={match.params.playername} />;
				}}
				exact
				strict
			/>
			<Route path="/articles" component={ArticlesShowAll} exact strict />
			<Route
				path="/articles/:articleid"
				render={({ match, history }) => {
					return <ArticleShow history={history} articleid={match.params.articleid} />;
				}}
				exact
				strict
			/>
			<Route path="/article/new" component={ArticleNew} exact strict />
			<Route path="/article/new/sucess" component={ArticleNewSuccess} exact strict />
			<Route path="/teams" component={TeamList} exact strict />
			<Route path="/team/new" component={TeamCreateNew} exact strict />
			<Route path="/team/edit/:id"
			render={({ match , history}) => {
				return <TeamEdit history={history} id={match.params.id} />;
			}} exact strict />
			<Route
				path="/team/:id"
				render={({ match , history}) => {
					return <TeamShow history={history} id={match.params.id} />;
				}}
				exact
				strict
			/>
			<Route path="/tournaments" component={TournamentList} exact strict />
			<Route
				path="/tournaments/:tournamentname"
				render={({ match }) => {
					return <Tournament tournamentname={match.params.tournamentname} />;
				}}
				exact
				strict
			/>
			<Route
				path="/tournaments/:tournamentname/:matchname"
				render={({ match }) => {
					return <Match tournamentname={match.params.tournamentname} matchname={match.params.matchname} />;
				}}
				exact
				strict
			/>
			<Route path="/register" component={RegistrationForm} exact strict />
			<Route path="/register/sucess" component={RegistrationSucess} exact strict />
			<Route path="/admin/rights" component={AdminGrantRights} exact strict />
			<Route path="/admin/articles" component={ArticleListAdmin} exact strict />
			<Route path="/admin/articles/edit/:articleid" render={({ match, history }) => {
				return <ArticleEdit history={history} articleid={match.params.articleid} />;
			}} exact strict />

			<Route path="/admin/game/new" component={GameNew} exact strict />
			<Route path="/admin/games" component={GameAdminList} exact strict />
			<Route path="/admin/game/edit/:keyname" render={({ match, history }) => {
				return <GameEdit history={history} keyname={match.params.keyname} />;
			}} exact strict />
			<Route
				render={() => {
					return "ERROR 404";
				}}
			/>

		</Switch>
	);
};

export default AllRoutes;
