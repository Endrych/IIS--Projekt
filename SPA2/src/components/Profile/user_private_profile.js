import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getUserInfoFromToken, getInvites, invitesShow, invitesHide, acceptInvite, declineInvite } from "../../actions";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

class UserPrivateProfile extends Component {
	componentDidMount() {
		// this.props.UserPrivateProfile
		var cookies = new Cookies();

		var token = cookies.get("user");
		this.props.getUserInfoFromToken(token, this.props.getInvites.bind(this, token));
	}

	renderAdminButtons = () => {
		return (
			<div style={{marginTop:"15px"}}>
				<div>
					<h4>Administrátorská práva</h4>
				</div>
				<div>
					<Link to="/admin/articles">
						<button className="btn btn-info  user-private_buttons">Správa článků</button>{" "}
					</Link>
					<Link to="/admin/games">
						<button className="btn btn-info  user-private_buttons">Správa her</button>{" "}
					</Link>
					{this.props.loginStatus.admin > 1 ? (
						<Link to="/admin/rights">
							<button className="btn btn-info  user-private_buttons">Upravit práva uživatele</button>{" "}
						</Link>
					) : (
						""
					)}
				</div>
			</div>
		);
	};

	handleAcceptInvite = id => {
		var cookies = new Cookies();

		var token = cookies.get("user");
		this.props.acceptInvite(token, id, this.props.getUserInfoFromToken.bind(this, token));
	};

	handleDeclineInvite = id => {
		var cookies = new Cookies();

		var token = cookies.get("user");
		this.props.declineInvite(token, id, this.props.getInvites.bind(this, token));
	};

	generateInvite = invite => {
		return (
			<div key={invite.Id}>
				<div>
					<Link to={`/team/${invite.Team.Id}`}>{invite.Team.Name}</Link>{" "}
					<button className="btn btn-primary" onClick={this.handleAcceptInvite.bind(this, invite.Id)}>
						{" "}
						Přijmout
					</button>
					<button onClick={this.handleDeclineInvite.bind(this, invite.Id)} className="btn btn-danger">
						Odmítnout
					</button>
				</div>
			</div>
		);
	};

	getListOfInvites = ({ invites }) => {
		let arrayInvites = [];
		for (let i = 0; i < invites.length; i++) {
			arrayInvites.push(this.generateInvite(invites[i]));
		}
		return arrayInvites;
	};

	handleInvites = () => {
		let toRender;
		if (this.props.userInvites.show) {
			toRender = this.getListOfInvites(this.props.userInvites);
			// toRender.push()
			if (toRender.length === 0) {
				toRender = <div>Nemáte žádné pozvánky</div>;
			}
		}

		return (
			<div>
				<div><h4>Pozvánky do týmu</h4></div>
				{this.props.userInvites.show ? (
					<button onClick={this.props.invitesHide} className="btn btn-secondary">
						Schovat
					</button>
				) : (
					<button className="btn btn-secondary" onClick={this.props.invitesShow}>
						Zobrazit
					</button>
				)}
				{this.props.userInvites.show ? toRender : ""}
			</div>
		);
	};

	render() {
		let toRender;
		if (this.props.loginStatus.loggedIn) {
			const { userInformations } = this.props;
			if (userInformations.acquired) {
				// const team = this.props.team || {Name: "", Id: ""};
				console.log(userInformations);
				toRender = (
					<div className="row">
						<div  className="col col-sm-12"><h2>Osobní profil</h2></div>
						<div className="col col-sm-6">
							<div>
								<span>Přezdívka:</span> <span>{userInformations.nickname}</span>
							</div>
							<div>
								<span>Tým:</span>
								<span>
									{userInformations.team ? (
										<Link to={`/team/${userInformations.team.Id}`}>
											{userInformations.team.Name}
										</Link>
									) : (
										" Nejste členem žádnéo týmu"
									)}
								</span>
							</div>
							<div>
								Jméno: <span>{userInformations.firstname}</span>
							</div>
							<div>
								Příjmení: <span>{userInformations.lastname}</span>
							</div>
							<div>
								Email: <span>{userInformations.email}</span>
							</div>
							<div>
								Telefon: <span>{userInformations.phone}</span>
							</div>
							<div>
								Úroveň práv:
								{userInformations.admin === 2
									? " Hlavní administrátor"
									: userInformations.admin === 1
									? " Administrátor"
									: " Uživatel"}
							</div>

							{!userInformations.team ? this.handleInvites() : ""}
							{userInformations.tournaments.length > 0 ? (
								<div>
									<h4>Vyhrané turnaje</h4>
									<div>
										{userInformations.tournaments.map(tournament => {
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
						<div className="col col-sm-6">
								<div>
									<div>
										<h4>Spravovat profil</h4>
									</div>
									<div>
									<Link to="/user/edit">
										<button className="btn btn-info user-private_buttons">Upravit údaje</button>
									</Link>
									{userInformations.team ? (
										<Link to={`/team/${userInformations.team.Id}`}>
											<button className="btn btn-info  user-private_buttons">Zobrazit tým</button>
										</Link>
									) : (
										<Link to="/team/new">
											<button className="btn btn-info  user-private_buttons">Založit tým</button>
										</Link>
									)}
								</div>
									{this.props.loginStatus.admin > 0 ? this.renderAdminButtons() : ""}
							</div>
						</div>
					</div>
				);
			} else {
				toRender = <div>Načítám data ...</div>;
			}
		} else {
			toRender = <Redirect to="/" />;
		}

		return (
			<div className="row  row__box">
				<div className="col col-sm-12">{toRender}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// const newState = state.userInformations;
	console.log(state)

	return { ...state };
}

export default connect(
	mapStateToProps,
	{ getUserInfoFromToken, getInvites, invitesShow, invitesHide, acceptInvite, declineInvite }
)(UserPrivateProfile);
