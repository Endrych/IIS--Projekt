import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTournamentsList, getUserInfoFromToken } from "./../../actions";
import Cookies from 'universal-cookie';

class TournamentsList extends Component {
	componentDidMount() {
		var cookies = new Cookies;

		var token = cookies.get("user");
		this.props.getUserInfoFromToken(token);
		this.props.fetchTournamentsList()
	}

	getTournamentItem = tournament => {
		return (
			<div key={tournament.Id}>
				<Link to={`/tournament/${tournament.Id}`}>{tournament.Name}</Link>
				<Link to={`/tournament/${tournament.Id}`}>
					<button className="btn btn-secondary">Přejít na turnaj</button>
				</Link>
			</div>
		);
	};

	getTournamentList = tournaments => {
		let openTournaments = [];
		let finishedTournaments = [];
		let activeTournaments = [];
		for (let i = 0; i < tournaments.length; i++) {
			if(tournaments[i].State === 0){
				openTournaments.push(this.getTournamentItem(tournaments[i]));
			}else if(tournaments[i].State === 1){
				activeTournaments.push(this.getTournamentItem(tournaments[i]));

			}else if(tournaments[i].State === 2){
				finishedTournaments.push(this.getTournamentItem(tournaments[i]));

			}
		}

		if (openTournaments.length === 0) {
			openTournaments = <div>Neexistuje žádný otevřený turnaj</div>;
		}

		if (activeTournaments.length === 0) {
			activeTournaments = <div>Neexistuje žádný aktivní turnaj</div>;
		}

		if (finishedTournaments.length === 0) {
			finishedTournaments = <div>Neexistuje žádný dohraný</div>;
		}

		return {activeTournaments, openTournaments, finishedTournaments};
	};

	getDomList(toRender){
		return(
			<div>
				<div>Otevřené turnaje</div>
				{toRender.openTournaments}
				<div>Probíhající turnaje</div>
				{toRender.activeTournaments}
				<div>Ukončené turnaje</div>
				{toRender.finishedTournaments}
			</div>
		)
	}

	render() {
		console.log(this.props.tournamentsAll);
		const { tournamentsAll } = this.props;
		let toRender;
		console.log(this.props.loginStatus)
		if (tournamentsAll.fetched) {
			if (tournamentsAll.fetchSucess) {
				toRender = this.getTournamentList(tournamentsAll.tournaments);
			} else {
				toRender = "Nezdařilo se načíst turnaje";
			}
		} else {
			toRender = <div>Fetching tournaments...</div>;
		}
		return (<div>
			<div><Link to="/tournament/new"><button className="btn btn-primary">Založit turnaj</button></Link></div>
			{tournamentsAll.fetchSucess ? this.getDomList(toRender) : toRender}
		</div>);
	}
}

function mapStateToProps({ tournamentsAll, loginStatus }) {
	return { tournamentsAll, loginStatus };
}

export default connect(
	mapStateToProps,
	{ fetchTournamentsList, getUserInfoFromToken }
)(TournamentsList);
