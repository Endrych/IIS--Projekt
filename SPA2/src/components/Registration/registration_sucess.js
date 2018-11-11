import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class RegistrationSucess extends Component {
	render() {
		return (
			<div className="row">
				<div className="col col-12">Registrace proběhla úspěsně!</div>
				<Link to="/">
					<div>Zpět na úvodní stránku</div>
				</Link>
			</div>
		);
	}
}

export default connect(null)(RegistrationSucess);
