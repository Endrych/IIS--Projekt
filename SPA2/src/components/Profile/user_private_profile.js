import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { getUserInfoFromToken } from "../../actions";
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class UserPrivateProfile extends Component {
	componentDidMount(){
		// this.props.UserPrivateProfile
		var cookies = new Cookies;

		var token = cookies.get("user");
		this.props.getUserInfoFromToken(token);
	}

	renderAdminButtons(){
		return(
			<div>
				<Link to="/admin/articles"><button className="btn btn-primary">Správa článků</button> </Link>
				<Link to="/admin/games"><button className="btn btn-primary">Správa her</button> </Link>
				{this.props.loginStatus.admin > 1 ? <Link to="/admin/rights"><button className="btn btn-primary">Upravit práva uživatele</button> </Link> : ""}
			</div>
		)
	}

	render() {
		let toRender;
		if(this.props.loginStatus.loggedIn){
			console.log(this.props)
			const { userInformations } = this.props;
			// const team = this.props.team || {Name: "", Id: ""};
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

	return state;
}

export default connect(mapStateToProps, {getUserInfoFromToken})(UserPrivateProfile);
