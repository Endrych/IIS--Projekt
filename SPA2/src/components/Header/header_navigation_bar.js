import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HeaderNavigationBar extends Component {
	render() {
		return (
			<div className="row">
				<div className="col col-4">
					<Link to="/news">
						<div>Novinky</div>
					</Link>
				</div>
				<div className="col col-4">
					<Link to="/games">
						<div>Hry</div>
					</Link>
				</div>
				<div className="col col-4">
					<Link to="/tournaments">
						<div>Turnaje</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default connect(null)(HeaderNavigationBar);