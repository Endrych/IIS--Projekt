import React, { Component } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Switch } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Route from "react-router-dom/Route";

// const App = () => {
// 	return (
// 		<Container className="bg-info clearfix">

// 		</Container>
// 	)
// }

const User = params => {
	return <h1>Welcome User {params.username}</h1>;
};

const Header = () => {
	return <h1>Header</h1>;
};

const Footer = () => {
	return <h1>Footer</h1>;
};

const LandingPage = () => {
	return (
		<div>
			<h1>Nejpopularnejsi Hry</h1>
			<br />
			<h1>Nadchazejici turnaje</h1>
			<br />
			<h1>Novinky</h1>
		</div>
	);
};

const Game = params => {
	return <h2>Hra {params.gametitle}</h2>;
};

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

const Match = params => {
	return (
		<h2>
			Zapas {params.matchname} v turnaji {params.tournamentname}
		</h2>
	);
};

const RegistrationPage = () => {
	return <h2>Registrace</h2>;
};

class App extends Component {
	state = {
		loggedIn: false
	};
	loginHandle = () => {
		this.setState(prevState => ({
			loggedIn: !prevState.loggedIn
		}));
	};
	render() {
		return (
			<Router>
				<div className="App">
					{/* <NavLink to="/" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						Home
					</NavLink>
					<NavLink to="/about" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						about
					</NavLink>
					<NavLink to="/user/John" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						John
					</NavLink>
					<NavLink to="/user/Peter" style={{ marginRight: 10 }} activeStyle={{ color: "green" }} exact>
						Peter
					</NavLink>

					<Prompt
						when={!this.state.loggedIn}
						message={location => {
							return location.pathname.startsWith("/user") ? "Are you sure" : true;
						}}
					/>

					<input
						type="button"
						value={this.state.loggedIn ? "log out" : "log in"}
						onClick={this.loginHandle.bind(this)}
					/> */}
					<Header />

					<AllRoutes />
					<Footer />
				</div>
			</Router>
		);
	}
}

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

			<Route path="/register" component={RegistrationPage} exact strict />

			<Route
				render={() => {
					return "ERROR 404";
				}}
			/>
		</Switch>
	);
};

export default App;

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/asdasdasd.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
