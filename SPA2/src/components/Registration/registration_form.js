import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import registrationFields from "../../enums/registration_fields";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions";
import registerCodes from "../../enums/register_codes";

import GeneralValidators from "../../validators/general_validators";

class RegistrationForm extends Component {
	renderField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		if (field.label === registrationFields.NICKNAME) {
			var getError = field.statusCode;
			if (getError === 303) {
				className = `form-group has-danger`;
				hasError = <div className="text-help">{registerCodes.code_303}</div>;
			}
		}

		return (
			<div className={className}>
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
				<input className="form-control" type={field.type} {...field.input}/>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.registerUser(values, this.handleCorrectSubmit.bind(this));
	}

	handleCorrectSubmit() {
		this.props.history.push("/register/sucess");
	}

	render() {
		const { handleSubmit } = this.props;
		const { statusCode } = this.props;

		return (
			<div className="row row__box">
				{statusCode === 500 ? (
					<div className="text-help has-danger">{registerCodes.code_500}</div>
				) : statusCode === 400 ? (
					<div className="text-help has-danger">{registerCodes.code_400}</div>
				) : (
					""
				)}
				<div className="col col-sm-12">
					<h3>Registrační formulář</h3>
				</div>
				<div className="col col-sm-12">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field
							name="Nickname"
							label={registrationFields.NICKNAME}
							component={this.renderField}
							props={this.props}
							require={true}
						/>
						<Field
							name="Firstname"
							type="text"
							label={registrationFields.FIRSTNAME}
							component={this.renderField}
							require={true}
						/>
						<Field
							name="Lastname"
							type="text"
							label={registrationFields.LASTNAME}
							component={this.renderField}
							require={true}
						/>
						<Field name="Email" type="text" label={registrationFields.EMAIL} component={this.renderField} require={true} />
						<Field
							name="Phone"
							type="text"
							label={registrationFields.PHONE_NUMBER}
							component={this.renderField}
						/>
						<Field
							name="Password"
							type="password"
							label={registrationFields.PASSWORD}
							component={this.renderField}
							require={true}
						/>
						<Field
							name="PasswordConfirm"
							type="password"
							label={registrationFields.REPEATED_PASSWORD}
							component={this.renderField}
							require={true}
						/>
						<button type="submit" style={{marginRight: "5px"}} className="btn btn-primary">
							{registrationFields.SUBMIT}
						</button>
						<Link to="/" className="btn btn-danger">
							{registrationFields.CANCEL}
						</Link>
					</form>
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
	if (!values.Firstname) {
		errors.Firstname = "Zadejte jmeno";
	} else if (!validator.AlphaCharacters(values.Firstname, { allowSpace: true })) {
		errors.Firstname = "Povoleny pouze znaky";
	} else if (!validator.Range(values.Firstname, { min: 1, max: 45 })) {
		errors.Firstname = "Povolena delka je 1-45 znaku";
	}

	if (!values.Lastname) {
		errors.Lastname = "Zadejte prijmeni";
	} else if (!validator.AlphaCharacters(values.Lastname, { allowSpace: true })) {
		errors.Lastname = "Povoleny pouze znaky";
	} else if (!validator.Range(values.Lastname, { min: 1, max: 45 })) {
		errors.Lastname = "Povolena delka je 1-45 znaku";
	}

	if (!values.Email) {
		errors.Email = "Zadejte vas Email";
	} else if (!validator.Email(values.Email)) {
		errors.Email = "Spatny format emailu";
	}
	if (!values.Password) {
		errors.Password = "Zadejte heslo";
		// errors.Password_repeat = "Zadejte heslo";
	} else if (!validator.AlphaNumericCharacters(values.Password)) {
		errors.Password = "Povoleny pouze alfanumericke znaky";
	} else if (!validator.Min(values.Password, { min: 6 })) {
		errors.Password = "Heslo musi mit aspon 6 znaku.";
	} else if (!validator.EqualValue(values.Password, { value: values.PasswordConfirm })) {
		// errors.Password = "Hesla se neshoduji";
		errors.PasswordConfirm = "Neshoduje se s heslem";
	}

	//if errors is empty form is fine to submit
	return errors;
}

function mapStateToProps({ registrationResultCode }) {
	return { statusCode: registrationResultCode.statusCode };
}

export default reduxForm({
	validate,
	form: "RegisterNewUser"
})(
	connect(
		mapStateToProps,
		{ registerUser }
	)(RegistrationForm)
);
