import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TournamentModalPopUp from "./tournament_modal";
import Cookies from "universal-cookie";
import { setTournamentModalValues, startNextRound, getTournamentDetails } from "../../actions";

class TournamentActive extends Component {
	createMatch = match => {
		const matchFinished = match.Score1 !== null && match.Score2 !== null;
		console.log("ASDASD", this.props, match, matchFinished);
		if (matchFinished) {
			return (
				<div key={match.Id + Math.random() * 1000}>
					{" "}
					{match.User1}{" "}
					<b>
						{match.Score1} - {match.Score2}
					</b>{" "}
					{match.User2}
				</div>
			);
		} else {
			return (
				<div style={{ marginBottom: "5px" }} key={match.Id + Math.random() * 1000}>
					{" "}
					{match.User1} <b>vs.</b> {match.User2}
					{this.props.tournamentModal.valueSet ? (
						this.props.tournamentModal.id === match.Id ? (
							<TournamentModalPopUp tournamentId={this.props.tournamentId} matchInfo={match} />
						) : (
							""
						)
					) : (
						""
					)}
					{this.props.loginStatus.admin > 0 ? (
						<button
							style={{ lineHeight: "1", marginLeft: "30px" }}
							className="btn btn-secondary"
							onClick={this.popModal.bind(this, match)}
						>
							Zadejte výsledek
						</button>
					) : (
						""
					)}
				</div>
			);
		}
	};

	popModal = match => {
		console.log("ASDASDDS");
		// const values = {valueSet: true };
		this.props.setTournamentModalValues(match.Id);
	};

	generateRound = (round, key) => {
		const roundArr = [
			<div key={key + Math.random() * 1000}>
				<h4>{key}. Kolo</h4>
			</div>
		];
		for (let i = 0; i < round.length; i++) {
			roundArr.push(this.createMatch(round[i]));
		}
		roundArr.push(<br key={Math.random() * 1000} />);
		return roundArr;
	};

	getRounds = (matches, round) => {
		let roundsArr = [];
		console.log(matches);
		const _this = this;
		Object.keys(matches).forEach(function(key) {
			console.log(key, matches[key]);
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

	nextRound = () => {
		var cookies = new Cookies();
		var token = cookies.get("user");

		this.props.startNextRound(token, this.props.tournamentId, this.props.getTournamentDetails);
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
						Hra: <Link to={`/games/${tournamentInfo.Game.Keyname}`}>{tournamentInfo.Game.Name}</Link>
					</div>
					<div className="col col-sm-12">{tournamentInfo.Description}</div>
				</div>
				<br />
				{this.props.loginStatus.admin > 0 ? (
					<div className="row">
						<div className="col col-sm-12">
							<button className="btn btn-secondary" onClick={this.nextRound}>
								Další kolo
							</button>
						</div>
					</div>
				) : (
					""
				)}
				{this.props.loginStatus.admin > 0 ? <br /> : ""}
				<div className="row">
					<div className="col col-sm-12">{this.getRounds(tournamentInfo.Matches, tournamentInfo.Round)}</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ tournamentModal, loginStatus }) {
	return { tournamentModal, loginStatus };
}

export default connect(
	mapStateToProps,
	{ setTournamentModalValues, startNextRound, getTournamentDetails }
)(TournamentActive);
