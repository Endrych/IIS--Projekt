import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayer, resetPlayerFetch } from "../../actions";
import { Link } from "react-router-dom";

class UserPublicProfile extends Component {
	componentDidMount() {
		this.props.fetchPlayer(this.props.playername, () => {this.props.resetPlayerFetch()});
	}

	fetchSucessfull = playerInfo => {
		return (
			<div className="col col-sm-12">
				<h3>Hráč: {playerInfo.nickname}</h3>
				<div>Tým: {playerInfo.team ? playerInfo.team.Name : "Není členem žádného týmu"} </div>
				<div>
					Jméno: {playerInfo.firstname} {playerInfo.lastname}
				</div>
				{playerInfo.tournaments.length > 0 ? (
					<div style={{marginTop: "10px"}}>
						<h4>Vyhrané turnaje</h4>
						<div>
							{playerInfo.tournaments.map(tournament => {
								return (
									<div key={tournament.Id}>
										<Link to={`/tournament/${tournament.Id}`}>{tournament.Name}</Link>{" "}
									</div>
								);
							})}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	};

	render() {
		const { playerInfo } = this.props;

		let toRender;
		if (playerInfo.fetched) {
			if (playerInfo.fetchSucess && playerInfo.status === 200) {
				toRender = this.fetchSucessfull(playerInfo);
			} else {
			toRender = <div style={{margin:"20px"}}>Hráč nenalezen</div>;
			}
		} else {
			toRender = <div>Loading data...</div>;
		}

		return <div className="row row__box">{toRender}</div>;
	}
}

function mapStateToProps({ playerInfo }) {
	return { playerInfo };
}

export default connect(
	mapStateToProps,
	{ fetchPlayer, resetPlayerFetch }
)(UserPublicProfile);
