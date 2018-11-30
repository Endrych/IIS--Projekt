import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { registerInTournament, unregisterFromTournament, getTournamentDetails } from '../../actions';

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

	render(){
		const {tournamentInfo} = this.props;
		const { loginStatus } = this.props;
		// tournamentInfo.Users = [...tournamentInfo.Users,"asd456", "asd789"]
		return(
			<div>
				<div><h2>{tournamentInfo.Name}</h2></div>
				<div>{tournamentInfo.Description}</div>
				<div>{loginStatus.loggedIn ? tournamentInfo.Users.includes(loginStatus.nickname) ?  <button className="btn btn-danger" onClick={this.handleUnregister.bind(this)}>Odhlásit se z turnaje</button> : <button className="btn btn-second" onClick={this.handleRegister.bind(this)}>Registrovat se do turnaje</button> : ""}</div>
				<div>Seznam hračů</div>
				{tournamentInfo.Users.map(user => <div key={user}><Link to={`/players/${user}`}>{user}</Link></div>)}
				{/* <div>{this.props}</div> */}
			</div>
		)
	}
}

// function mapStateToProps(state){
// 	return state;
// }

export default connect(null, {registerInTournament, unregisterFromTournament, getTournamentDetails})(TournamentOpen)