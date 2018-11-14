import React, { Component } from "react";
import { connect } from "react-redux";

import HeaderLoginFields from "./header_login_fields.js";
import HeaderNavigationBar from "./header_navigation_bar.js";

class Header extends Component {
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

export default connect(null)(Header);
