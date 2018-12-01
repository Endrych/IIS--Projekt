import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from 'universal-cookie';
import { getLoggedInStatus } from "../../actions";
import HeaderLoginFields from "./header_login_fields.js";
import HeaderNavigationBar from "./header_navigation_bar.js";
import SearchBar from './../Searcher/search_bar';


class Header extends Component {
	componentDidMount(){
		var cookies = new Cookies;

		var token = cookies.get("user");
		if(token !== undefined){
			// console.log(this);
			this.props.getLoggedInStatus(token);
		}
	}

	render() {
		console.log("//////", this)
		return (
			<div className="row">
				<div className="col col-12">
					<HeaderLoginFields />
					<SearchBar history={this.props.history}/>
					<HeaderNavigationBar />
				</div>
			</div>
		);
	}
}


export default connect(null, {getLoggedInStatus})(Header);
