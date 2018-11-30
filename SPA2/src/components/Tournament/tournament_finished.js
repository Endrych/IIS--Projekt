import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class TournamentFinished extends Component{



	createMatch = (match) => {
		// const matchFinished = !!match.Score1 && !!match.Score2;
		console.log("ASDASD", this.props, match)
		return <div key={match.Id + match.Score1}> {match.User1} {match.Score1} - {match.Score2} {match.User2}</div>

	}


	generateRound= (round, key) => {
		const roundArr = [<div key={key}><h4>{key}. Kolo</h4></div>];
		for(let i = 0; i < round.length; i++){
			roundArr.push(this.createMatch(round[i]))
		}

		return roundArr;
	}

	getRounds = (matches, round) => {
		let roundsArr = [];
		console.log(matches)
		const _this = this;
		Object.keys(matches).forEach(function(key) {
			console.log(key, matches[key]);
			roundsArr.push(_this.generateRound(matches[key], key))

		  });		// for(){
		// 	if(i === round){
		// 		roudnsArr.push(this.generateRound(matches[i]), true)
		// 	}else{
		// 		roudnsArr.push(this.generateRound(matches[i]))
		// 	}
		// }
		return roundsArr;
	}

	render(){
		const {tournamentInfo} = this.props;
		const { loginStatus } = this.props;
console.log(tournamentInfo)
		return(
			<div>
				<div><h2>{tournamentInfo.Name}</h2></div>
				<div>{tournamentInfo.Description}</div>
				<div><Link to={`/games/${tournamentInfo.Game.Keyname}`}>Hra: {tournamentInfo.Game.Name}</Link></div>
				<div> Vítěz: <Link to={`/players/${tournamentInfo.Winner}`}>{tournamentInfo.Winner}</Link></div>
				<div><h3>Historie turnaje</h3></div>
				<div>{this.getRounds(tournamentInfo.Matches, tournamentInfo.Round)}</div>
				<div><h3>Seznam hračů</h3></div>
				{tournamentInfo.Users.map(user => <div key={user}><Link to={`/players/${user}`}>{user}</Link></div>)}
			</div>
		)
	}
}


// function mapStateToProps(state){
// 	return state;
// }

export default connect(null)(TournamentFinished)