import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class TournamentFinished extends Component {
	createMatch = match => {
		// const matchFinished = !!match.Score1 && !!match.Score2;
		return (
			<div key={Number(match.Id + match.Score1 + match.Score2)+Math.random()*1000}>
				{" "}
				{match.User1} <b> {match.Score1} - {match.Score2} </b> {match.User2}
			</div>
		);
	};

	generateRound = (round, key) => {
		const roundArr = [
			<div key={key}>
				<h5>{key}. Kolo</h5>
			</div>
		];
		for (let i = 0; i < round.length; i++) {
			roundArr.push(this.createMatch(round[i]));
		}
		roundArr.push(<br key={Math.random() * 1000}/>)
		return roundArr;
	};

	getRounds = (matches, round) => {
		let roundsArr = [];
		const _this = this;
		Object.keys(matches).forEach(function(key) {
			roundsArr.push(_this.generateRound(matches[key], key));
		}); // for(){
		// 	if(i === round){
		// 		roudnsArr.push(this.generateRound(matches[i]), true)
		// 	}else{
		// 		roudnsArr.push(this.generateRound(matches[i]))
		// 	}
		// }
		return roundsArr;
	};

	render() {
		const { tournamentInfo } = this.props;
		const { loginStatus } = this.props;
		return (
			<div className="col col-sm-12">
				<div className="row">
					<div className="col col-sm-12">
						<h3>Turnaj: {tournamentInfo.Name}</h3>
					</div>
					<div className="col col-sm-12">
						Vítěz: <Link to={`/players/${tournamentInfo.Winner}`}>{tournamentInfo.Winner}</Link>
					</div>
					<div className="col col-sm-12">
						Hra: <Link to={`/games/${tournamentInfo.Game.Keyname}`}> {tournamentInfo.Game.Name}</Link>
					</div>
					<div className="col col-sm-12">{tournamentInfo.Description}</div>
				</div>
				<br/>
				<div className="row">
					<div className="col col-sm-12">
						<h4>Historie turnaje</h4>
					</div>
					<div className="col col-sm-12">{this.getRounds(tournamentInfo.Matches, tournamentInfo.Round)}</div>
				</div>
				<div className="row">
					<div className="col col-sm-12">
						<h4>Seznam hračů</h4>
					</div>
					{tournamentInfo.Users.map(user => (
						<div  className="col col-sm-12" key={user}>
							<Link to={`/players/${user}`}>{user}</Link>
						</div>
					))}
				</div>
			</div>
		);
	}
}

// function mapStateToProps(state){
// 	return state;
// }

export default connect(null)(TournamentFinished);
