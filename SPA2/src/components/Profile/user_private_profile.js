import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { getUserInfoFromToken, getInvites, invitesShow, invitesHide, acceptInvite, declineInvite } from "../../actions";
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class UserPrivateProfile extends Component {
	componentDidMount(){
		// this.props.UserPrivateProfile
		var cookies = new Cookies;

		var token = cookies.get("user");
		this.props.getUserInfoFromToken(token, this.props.getInvites.bind(this, token));
	}

	renderAdminButtons = () => {
		return(
			<div>
				<Link to="/admin/articles"><button className="btn btn-primary">Správa článků</button> </Link>
				<Link to="/admin/games"><button className="btn btn-primary">Správa her</button> </Link>
				{this.props.loginStatus.admin > 1 ? <Link to="/admin/rights"><button className="btn btn-primary">Upravit práva uživatele</button> </Link> : ""}
			</div>
		)
	}

	handleAcceptInvite = (id)=>{
		var cookies = new Cookies;

		var token = cookies.get("user");
		this.props.acceptInvite(token, id, this.props.getUserInfoFromToken.bind(this, token) )
	}

	handleDeclineInvite = (id) => {
		var cookies = new Cookies;

		var token = cookies.get("user");
		this.props.declineInvite(token, id, this.props.getInvites.bind(this, token) )
	}

	generateInvite = (invite) => {
		return(
			<div key={invite.Id}>
				<div><Link to={`/team/${invite.Team.Id}`}>{invite.Team.Name}</Link> <button className="btn btn-primary" onClick={this.handleAcceptInvite.bind(this, invite.Id)}> Přijmout</button><button onClick={this.handleDeclineInvite.bind(this, invite.Id)} className="btn btn-danger">Odmítnout</button></div>
			</div>
		)

	}

	getListOfInvites = ({invites}) =>{
		let arrayInvites = [];
		for(let i = 0; i < invites.length; i++){
			arrayInvites.push(this.generateInvite(invites[i]));
		}
		return arrayInvites;
	}

	handleInvites = ()=>{
		let toRender;
		if(this.props.userInvites.show){
			toRender = this.getListOfInvites(this.props.userInvites);
			// toRender.push()
			if(toRender.length === 0){
				toRender =  <div>Nemáte žádné pozvánky</div>
			}
		}


		return(
			<div>
				<div>Pozvánky do týmu</div>
				{this.props.userInvites.show ? <button onClick={this.props.invitesHide} className="btn btn-secondary">Schovat</button> : <button className="btn btn-secondary" onClick={this.props.invitesShow}>Zobrazit</button>}
				{this.props.userInvites.show ? toRender : ""}
			</div>
		)
	}

	render() {
		let toRender;
		if(this.props.loginStatus.loggedIn){
			const { userInformations } = this.props;
			// const team = this.props.team || {Name: "", Id: ""};
			console.log(userInformations)
			toRender = <div className="row">
			{/* <Redirect  to="/" /> */}
			<div>Přezdívka: <span>{userInformations.nickname}</span></div>
			<div>Tým: <span>{userInformations.team ? <Link to={`/team/${userInformations.team.Id}`}>{ userInformations.team.Name }</Link>: "Nejste členem žádnéo týmu"}</span></div>
			<div>Jméno: <span>{userInformations.firstname}</span></div>
			<div>Příjmení: <span>{userInformations.lastname}</span></div>
			<div>Email: <span>{userInformations.email}</span></div>
			<div>Telefon: <span>{userInformations.phone}</span></div>
			<div> Úroveň práv: {userInformations.admin === 2 ? "Hlavní administrátor" : userInformations.admin === 1 ? "Administrátor" : "Uživatel"}</div>
			<Link to="/user/edit"><button className="btn btn-primary">Upravit údaje</button></Link>
			{userInformations.team ? <Link to={`/team/${userInformations.team.Id}`}><button className="btn btn-primary">Zobrazit tým</button></Link> : <Link to="/team/new"><button className="btn btn-primary">Založit tým</button></Link>}
			{this.props.loginStatus.admin > 0 ? this.renderAdminButtons() : ""}
			{!userInformations.team ? this.handleInvites() : "" }
			{userInformations.tournaments.length > 0 ? (
					<div>
						<h3>Vyhrané turnaje</h3>
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
		</div>;
		}else{
			toRender =  <Redirect  to="/" />

		}

		return (
			<div>
				{toRender}
			</div>
		);
	}
}

function mapStateToProps(state){
	// const newState = state.userInformations;

	return {...state};
}

export default connect(mapStateToProps, {getUserInfoFromToken, getInvites, invitesShow, invitesHide, acceptInvite, declineInvite})(UserPrivateProfile);
