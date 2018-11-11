import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { loginUser } from "../../actions";

import { Link } from "react-router-dom";
import GeneralValidators from "../../validators/general_validators";

class HeaderLoginFields extends Component {

	renderField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}


	onSubmit(values) {
		this.props.loginUser(values);
	}

	render() {
		const { handleSubmit } = this.props;
		console.log(this)
		return (
			<div className="row">
				<div className="col col-8">
					<form  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Nickname"  label="Přezdívka" component={this.renderField}/>
						<Field name="Password" label="Heslo" component={this.renderField}/>
						<button type="submit" className="btn btn-primary">Přihlásit</button>
					</form>
				</div>
				<div className="col col-4">
					<Link to="/register"><div>Registrace</div></Link>
				</div>
			</div>
		);
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


export default reduxForm({
	validate,
	form: "LoginForm"
})(
	connect(
		null,
		{ loginUser }
	)(HeaderLoginFields)
);
//{ loginUser }
// export default connect(null)(HeaderLoginFields);
