import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HeaderLoginFields extends Component {
	handleSubmit(e) {
		e.preventDefault();
		console.log("Submitted", e);
	}

	render() {
		return (
			<div className="row">
				<div className="col col-8">
					<form className="header__login-fields" onSubmit={this.handleSubmit}>
						<div className="header__login-fields--title">Jméno</div>
						<input className="header__login-fields--input" name="login" placeholder="Jméno" />
						<div className="header__login-fields--title">Heslo</div>
						<input
							className="header__login-fields--input"
							name="login"
							type="password"
							placeholder="******"
							name="password"
						/>
						<input className="btn btn-primary" type="submit" value="Přihlásit" />
					</form>
				</div>
				<div className="col col-4">
					<Link to="/register"><div>Registrace</div></Link>
				</div>
			</div>
		);
	}
}


export default connect(null)(HeaderLoginFields);
