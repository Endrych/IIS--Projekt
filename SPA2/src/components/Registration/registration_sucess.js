import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class RegistrationSucess extends Component {
	render() {
		return (
			<div className="row row__box">
				<div className="col col-12">Registrace proběhla úspěsně!</div>
				<Link to="/">
					<button className="btn btn-primary">Zpět na úvodní stránku</button>
				</Link>
			</div>
		);
	}
}

export default connect(null)(RegistrationSucess);
