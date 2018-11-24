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

	render() {
		let toRender;
		if(this.props.loginStatus.loggedIn){
			toRender = <div className="row">
			{/* <Redirect  to="/" /> */}
			<div>Přezdívka: <span>{this.props.userInformations.nickname}</span></div>
			<div>Tým: <span>{this.props.userInformations.team ? this.props.userInformations.team : "Nejste členem žádnéo týmu"}</span></div>
			<div>Jméno: <span>{this.props.userInformations.firstname}</span></div>
			<div>Příjmení: <span>{this.props.userInformations.lastname}</span></div>
			<div>Email: <span>{this.props.userInformations.email}</span></div>
			<div>Telefon: <span>{this.props.userInformations.phone}</span></div>
			<Link to="/user/edit"><button className="btn btn-primary">Upravit údaje</button></Link>
			{this.props.loginStatus.admin > 0 ? <Link to="/admin/articles"><button className="btn btn-primary">Správa článků</button> </Link>: ""}
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
