import React, { Component } from "react";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch, Route } from "react-router-dom";

import LandingPage from "./LandingPage/landing_page";
import RegistrationForm from "./registration_form.js";

class Game extends Component {
	constructor(props) {
		super();
	}
	render() {
		return <h2>Hra {this.props.gametitle}</h2>;
	}
}

const GameList = () => {
	return <h2>Seznam her</h2>;
};

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
	return<h2>News List</h2>
}

const NewsArticle = params => {
	console.log(params)
	return <h2>Article {params.articleid}</h2>;
}

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
				path="/games/:gametitle"
				render={({ match }) => {
					return <Game gametitle={match.params.gametitle} />;
				}}
				exact
				strict
			/>

			<Route path="/players" component={PlayerList} exact strict />

			<Route
				path="/players/:playername"
				render={({ match }) => {
					return <Player playername={match.params.playername} />;
				}}
				exact
				strict
			/>


			<Route path="/news" component={NewsList} exact strict />

			<Route
				path="/news/:articleid"
				render={({ match }) => {
					return <NewsArticle articleid={match.params.articleid} />;
				}}
				exact
				strict
			/>


			<Route path="/teams" component={TeamList} exact strict />

			<Route
				path="/teams/:teamname"
				render={({ match }) => {
					return <Team teamname={match.params.teamname} />;
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

			<Route
				render={() => {
					return "ERROR 404";
				}}
			/>
		</Switch>
	);
};

export default AllRoutes;
