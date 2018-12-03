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
			<div className="row" style={{backgroundColor: "yellow"}}>
				<div className="col col-xs-12">
					<div className="row">
						<HeaderLoginFields history={this.props.history} />
						<SearchBar history={this.props.history}/>
					</div>
					<div className="row">
						<HeaderNavigationBar />
					</div>
				</div>
			</div>
		);
	}
}


export default connect(null, {getLoggedInStatus})(Header);
