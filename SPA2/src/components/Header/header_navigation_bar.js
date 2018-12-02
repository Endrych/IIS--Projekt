import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HeaderNavigationBar extends Component {
	render() {
		return (
			<div className="col col-sm-12">
				<div className="row">
					<div className="col col-sm-4">
						<Link to="/articles">
							<div>Novinky</div>
						</Link>
					</div>
					<div className="col col-sm-4">
						<Link to="/games">
							<div>Hry</div>
						</Link>
					</div>
					<div className="col col-sm-4">
						<Link to="/tournaments">
							<div>Turnaje</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(HeaderNavigationBar);
