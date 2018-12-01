import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { registerInTournament, unregisterFromTournament, getTournamentDetails, startTournament, resetStartState } from '../../actions';

class TournamentOpen extends Component{

	handleRegister = () => {
		var cookies = new Cookies;
		var token = cookies.get("user");

		this.props.registerInTournament(token, this.props.tournamentID, this.props.getTournamentDetails.bind(this,this.props.tournamentID));

	}

	handleUnregister = () => {
		var cookies = new Cookies;
		var token = cookies.get("user");

		this.props.unregisterFromTournament(token, this.props.tournamentID, this.props.getTournamentDetails.bind(this,this.props.tournamentID));
	}

	handleStartTournament = () => {
		var cookies = new Cookies;
		var token = cookies.get("user");

		this.props.startTournament(token, this.props.tournamentID,  this.props.getTournamentDetails.bind(this,this.props.tournamentID), this.props.resetStartState);
	}

	render(){
		const {tournamentInfo} = this.props;
		const { loginStatus } = this.props;
		// tournamentInfo.Users = [...tournamentInfo.Users,"asd456", "asd789"]
		return(
			<div>
				<div><h2>{tournamentInfo.Name}</h2></div>
				<div>{tournamentInfo.Description}</div>
				<div><Link to={`/games/${tournamentInfo.Game.Keyname}`}>Hra: {tournamentInfo.Game.Name}</Link></div>
				<div>{loginStatus.loggedIn ? tournamentInfo.Users.includes(loginStatus.nickname) ?  <button className="btn btn-danger" onClick={this.handleUnregister.bind(this)}>Odhlásit se z turnaje</button> : <button className="btn btn-second" onClick={this.handleRegister.bind(this)}>Registrovat se do turnaje</button> : ""}
				{loginStatus.loggedIn ? loginStatus.admin  > 0 ? <button className="btn btn-primary" onClick={this.handleStartTournament.bind(this)}>Spustit turnaj</button> : "" : ""}
				{this.props.tournamentStart.try ? !this.props.tournamentStart.failed ? <div className="error">V turnaji musí být alespoň 2 hráči!</div> : "" : ""}
				</div>
				<div>Seznam hračů</div>
				{tournamentInfo.Users.map(user => <div key={user}><Link to={`/players/${user}`}>{user}</Link></div>)}
				{/* <div>{this.props}</div> */}
			</div>
		)
	}
}

function mapStateToProps({tournamentStart}){
	return {tournamentStart};
}

export default connect(mapStateToProps, {registerInTournament, unregisterFromTournament, getTournamentDetails, startTournament, resetStartState})(TournamentOpen)