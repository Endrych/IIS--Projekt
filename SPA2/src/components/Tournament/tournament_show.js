import React, { Component } from "react";
import { connect } from "react-redux";
import { getTournamentDetails, getLoggedInStatus, removeTournament, insertModal } from "../../actions";
// import Field
import TournamentOpen from "./tournament_open";
import TournamentActive from "./tournament_active";
import TournamentFinished from "./tournament_finished";
import Modal from './../Modal/modal';
import Cookies from "universal-cookie";

class TournamentShow extends Component {
	componentDidMount() {
		var cookies = new Cookies();

		var token = cookies.get("user");
		// this.props.getLoggedInStatus(token);
		this.props.getTournamentDetails(this.props.id);
	}

	handleRemoveTournament = () => {
		var cookies = new Cookies();

		var token = cookies.get("user");
		console.log(this.props.id, "SAD<<<<<<>>>>", this.props);
		this.props.removeTournament(token, this.props.id, ()=>{this.props.history.push('/tournaments')});
	};


	handleInsertModal = (id) => {
		this.props.insertModal(id)
	}

	render() {
		const { tournamentInfo } = this.props;
		console.log(this.props.loginStatus);
		let toRender;
		let toRenderRemove = "";
		if (tournamentInfo.fetched) {
			if (tournamentInfo.fetchSucess) {
				if (tournamentInfo.State === 0) {
					toRender = (
						<TournamentOpen
							tournamentInfo={tournamentInfo}
							loginStatus={this.props.loginStatus}
							tournamentID={this.props.id}
						/>
					);
					toRenderRemove =
						this.props.loginStatus.admin > 0 ? (
							<div className="col col-sm-12">
								{this.props.modal.show ? this.props.modal.value === this.props.id ? <Modal displayText={`Zrušit turnaj ${tournamentInfo.Name}`} callback={this.handleRemoveTournament.bind(this)} /> : "" : "" }

								<button className="btn btn-danger" onClick={this.handleInsertModal.bind(this, this.props.id)}>
									Zrušit turnaj
								</button>
							</div>
						) : (
							""
						);
				} else if (tournamentInfo.State === 1) {
					toRender = (
						<TournamentActive
							tournamentInfo={tournamentInfo}
							loginStatus={this.props.loginStatus}
							tournamentId={this.props.id}
						/>
					);
					// toRenderRemove = (this.props.loginStatus.admin > 0 ? <div><button className="btn btn-danger" onClick={this.handleRemoveTournament.bind(this)}>Zrušit turnaj</button></div> : "")
				} else if (tournamentInfo.State === 2) {
					toRender = (
						<TournamentFinished
							tournamentInfo={tournamentInfo}
							loginStatus={this.props.loginStatus}
							tournamentId={this.props.id}
						/>
					);
					// toRenderRemove = (this.props.loginStatus.admin > 0 ? <div><button className="btn btn-danger" onClick={this.handleRemoveTournament.bind(this)}>Odstranit turnaj z historie</button></div> : "")
				} else {
					toRender = (
						<div className="col col-sm-12">Získané informace jsou poškozeny. Kontaktujte správce.</div>
					);
				}
			} else {
				toRender = <div className="col col-sm-12">Nezdařilo se získat informace o turnaji</div>;
			}
		} else {
			toRender = <div className="col col-sm-12"> Získávám informace o turnaji, prosím čekejete.</div>;
		}

		console.log(toRenderRemove);

		return (
			<div className="row row__box">
				{toRender}
				{toRenderRemove}
			</div>
		);
	}
}

function mapStateToProps({ tournamentInfo, loginStatus, modal }) {
	return { tournamentInfo, loginStatus, modal };
}

export default connect(
	mapStateToProps,
	{ getTournamentDetails, getLoggedInStatus, removeTournament,insertModal }
)(TournamentShow);
