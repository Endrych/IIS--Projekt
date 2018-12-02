import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Cookies from "universal-cookie";

import { loginUser, logOut } from "../../actions";

import { Link } from "react-router-dom";
import GeneralValidators from "../../validators/general_validators";

class HeaderLoginFields extends Component {
	renderField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = ` ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		return (
			<div className={className} style={{ marginRight: "5px" }}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<label style={{ margin: "0px", marginRight: "2px" }}>{field.label}</label>
					<input className="form-control" type={field.type} {...field.input} />
				</div>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.loginUser(values);
	}

	loggedOut() {
		const { handleSubmit } = this.props;
		const { statusCode } = this.props;
		const loginFailed = statusCode === 401 || statusCode === 400 || statusCode === 500;

		return (
			// <div className="col col-6">
			<div className="row">
				<div className="col col-sm-10">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
							<Field name="Nickname" label="Přezdívka" component={this.renderField} />
							<Field name="Password" label="Heslo" component={this.renderField} />
							<button type="submit" className="btn btn-primary">
								Přihlásit
							</button>
						</div>
						{loginFailed ? <div className="text-help has-danger"> Neplatné údaje</div> : ""}
					</form>
				</div>
				<div className="col col-sm-2">
					<Link to="/register">
						<div>Registrace</div>
					</Link>
				</div>
			</div>
			// </div>
		);
	}

	logOutUser() {
		const cookies = new Cookies();
		cookies.remove("user");

		this.props.logOut();
	}

	logedIn() {

		const styleButton1 = { borderRadius: "0px", borderTopRightRadius: ".25em",  borderBottomRightRadius: ".25em", borderLeft: "none"}
		const styleButton2 = { borderRadius: "0px", borderTopLeftRadius: ".25em",  borderBottomLeftRadius: ".25em", borderLeft: "none"}


		return (
			<div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<div className="col col-sm-6">
					<div><h5>{this.props.nickname}</h5></div>
				</div>
				<div className="col col-sm-6" style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
					<Link to="/user"><button style={styleButton2}  className="btn btn-info"> Profil</button> </Link>
					<button style={styleButton1} className="btn btn-danger" onClick={this.logOutUser.bind(this)}>
						Odhlášení
					</button>
				</div>
			</div>
		);
	}

	render() {
		// console.log("ASDASD", this.props, "PROPS");
		let toRender;
		if (this.props.loggedIn) {
			toRender = this.logedIn();
		} else {
			toRender = this.loggedOut();
		}
		// if(this.)this.logedOut
		return <div className="col col-xs-12 col-sm-8">{toRender}</div>;
	}
}

function validate(values) {
	const errors = {};
	const validator = new GeneralValidators();
	// validate inputs here
	if (!values.Nickname) {
		errors.Nickname = "Enter a nickname";
	} else if (!validator.AlphaNumericCharacters(values.Nickname)) {
		errors.Nickname = "Povoleny pouze alfanumericke znaky";
	} else if (!validator.Range(values.Nickname, { min: 4, max: 45 })) {
		errors.Nickname = "Povolena delka je 4-45 znaku";
	}

	if (!values.Password) {
		errors.Password = "Zadejte heslo";
		// errors.Password_repeat = "Zadejte heslo";
	} else if (!validator.AlphaNumericCharacters(values.Password)) {
		errors.Password = "Povoleny pouze alfanumericke znaky";
	} else if (!validator.Min(values.Password, { min: 6 })) {
		errors.Password = "Heslo musi mit aspon 6 znaku.";
	}

	//if errors is empty form is fine to submit
	return errors;
}

function mapStateToProps(state) {
	const newState = state.loginStatus;
	// console.log(newState.statusCode, "SAD@@@");
	return state.loginStatus;
}

export default reduxForm({
	validate,
	form: "LoginForm"
})(
	connect(
		mapStateToProps,
		{ loginUser, logOut }
	)(HeaderLoginFields)
);
//{ loginUser }
// export default connect(null)(HeaderLoginFields);
