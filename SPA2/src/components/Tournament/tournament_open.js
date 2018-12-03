import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import {
	registerInTournament,
	unregisterFromTournament,
	getTournamentDetails,
	startTournament,
	resetStartState
} from "../../actions";

class TournamentOpen extends Component {
	handleRegister = () => {
		var cookies = new Cookies();
		var token = cookies.get("user");

		this.props.registerInTournament(
			token,
			this.props.tournamentID,
			this.props.getTournamentDetails.bind(this, this.props.tournamentID)
		);
	};

	handleUnregister = () => {
		var cookies = new Cookies();
		var token = cookies.get("user");

		this.props.unregisterFromTournament(
			token,
			this.props.tournamentID,
			this.props.getTournamentDetails.bind(this, this.props.tournamentID)
		);
	};

	handleStartTournament = () => {
		var cookies = new Cookies();
		var token = cookies.get("user");

		this.props.startTournament(
			token,
			this.props.tournamentID,
			this.props.getTournamentDetails.bind(this, this.props.tournamentID),
			this.props.resetStartState
		);
	};

	render() {
		const { tournamentInfo } = this.props;
		const { loginStatus } = this.props;
		// tournamentInfo.Users = [...tournamentInfo.Users,"asd456", "asd789"]
		return (
			<div className="col col-sm-12">
				<div className="row">
					<div className="col col-sm-12">
						<h3>Turnaj: {tournamentInfo.Name}</h3>
					</div>
					<div className="col col-sm-12">
						<div>
							Hra: <Link to={`/games/${tournamentInfo.Game.Keyname}`}>{tournamentInfo.Game.Name}</Link>
						</div>
						<div>{tournamentInfo.Description}</div>
						<br />
					</div>
				</div>
				<div className="row">
					<div className="col col-sm-12">
						{loginStatus.loggedIn ? (
							tournamentInfo.Users.includes(loginStatus.nickname) ? (
								<button style={{marginRight: "5px"}}className="btn btn-danger" onClick={this.handleUnregister.bind(this)}>
									Odhlásit se z turnaje
								</button>
							) : (
								<button style={{marginRight: "5px"}} className="btn btn-second" onClick={this.handleRegister.bind(this)}>
									Registrovat se do turnaje
								</button>
							)
						) : (
							""
						)}
						{loginStatus.loggedIn ? (
							loginStatus.admin > 0 ? (
								<button className="btn btn-primary" onClick={this.handleStartTournament.bind(this)}>
									Spustit turnaj
								</button>
							) : (
								""
							)
						) : (
							""
						)}
						{this.props.tournamentStart.try ? (
							!this.props.tournamentStart.failed ? (
								<div className="text-danger">V turnaji musí být alespoň 2 hráči!</div>
							) : (
								""
							)
						) : (
							""
						)}
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col col-sm-12">
						<h5>Seznam hračů</h5>
						{tournamentInfo.Users.map(user => (
							<div className="col col-sm-12" key={user}>
								<Link to={`/players/${user}`}>{user}</Link>
							</div>
						))}
					</div>
				</div>
				<br />
				{/* <div>{this.props}</div> */}
			</div>
		);
	}
}

function mapStateToProps({ tournamentStart }) {
	return { tournamentStart };
}

export default connect(
	mapStateToProps,
	{ registerInTournament, unregisterFromTournament, getTournamentDetails, startTournament, resetStartState }
)(TournamentOpen);
