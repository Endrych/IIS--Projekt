import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from 'universal-cookie';
import { getUserInfoFromToken } from "../../actions";
import HeaderLoginFields from "./header_login_fields.js";
import HeaderNavigationBar from "./header_navigation_bar.js";

class Header extends Component {
	componentDidMount(){
		var cookies = new Cookies;
		console.log("HEADER COOKIES: ", cookies.get("user"));
		var token = cookies.get("user");
		if(token !== undefined){
			console.log(this);
			getUserInfoFromToken(token);
			console.log("PUHS OUT ACTION")
		}
	}

	render() {
		return (
			<div className="row">
				<div className="col col-12">
					<HeaderLoginFields />
					<HeaderNavigationBar />
				</div>
			</div>
		);
	}
}

export default connect(null, {getUserInfoFromToken})(Header);
