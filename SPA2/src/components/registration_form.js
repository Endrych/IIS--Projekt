import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import registrationFields from "../enums/registrationFields.js";
import { Link } from "react-router-dom";
import { registerUser } from "../actions"

import GeneralValidators from "../validators/general_validators";

class RegistrationForm extends Component{
	renderField(field){
		const {meta: {touched, error}} = field;
		const className = `form-group ${touched && error ? "has-danger" : ''}`

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		this.props.registerUser(values);
	}

	render(){
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field name="Nickname" label={registrationFields.NICKNAME} component={this.renderField}/>
				<Field name="Firstname" label={registrationFields.FIRSTNAME} component={this.renderField}/>
				<Field name="Lastname" label={registrationFields.LASTNAME} component={this.renderField}/>
				<Field name="Email" label={registrationFields.EMAIL} component={this.renderField}/>
				<Field name="Phone" label={registrationFields.PHONE_NUMBER} component={this.renderField}/>
				<Field name="Password" label={registrationFields.PASSWORD} component={this.renderField}/>
				<Field name="PasswordConfirm" label={registrationFields.REPEATED_PASSWORD} component={this.renderField}/>
				<button type="submit" className="btn btn-primary">{registrationFields.SUBMIT}</button>
				<Link to="/" className="btn btn-danger">{registrationFields.CANCEL}</Link>
			</form>
		)
	}
}

function validate(values){
	const errors = {};
	const validator = new GeneralValidators;
	// validate inputs here


	if(!values.Nickname){
		errors.Nickname = "Enter a nickname";
	}else if(!validator.AlphaNumericCharacters(values.Nickname)){
		errors.Nickname = "Povoleny pouze alfanumericke znaky";
	}else if(!validator.Range(values.Nickname,  {min:4, max:45})){
		errors.Nickname = "Povolena delka je 4-45 znaku";
	}

	if(!values.Firstname){
		errors.Firstname = "Zadejte jmeno"
	}else if(!validator.AlphaCharacters(values.Firstname, {allowSpace: true})){
		errors.Firstname = "Povoleny pouze znaky";
	}else if(!validator.Range(values.Firstname, {min: 1, max:45})){
		errors.Firstname = "Povolena delka je 1-45 znaku";
	}

	if(!values.Lastname){
		errors.Lastname = "Zadejte prijmeni"
	}else if(!validator.AlphaCharacters(values.Lastname, {allowSpace: true})){
		errors.Lastname = "Povoleny pouze znaky";
	}else if(!validator.Range(values.Lastname, {min: 1, max:45})){
		errors.Lastname = "Povolena delka je 1-45 znaku";
	}

	if(!values.Email){
		errors.Email = "Zadejte vas Email";
	}else if(!validator.Email(values.Email)){
		errors.Email = "Spatny format emailu";
	}
	if(!values.Password){
		errors.Password = "Zadejte heslo";
		// errors.Password_repeat = "Zadejte heslo";
	}else if(!validator.AlphaNumericCharacters(values.Password)){
		errors.Password = "Povoleny pouze alfanumericke znaky"
	}else if(!validator.Min(values.Password, {min: 6})){
		errors.Password = "Heslo musi mit aspon 6 znaku."
	}else if(!validator.EqualValue(values.Password, {value: values.PasswordConfirm})){
		// errors.Password = "Hesla se neshoduji";
		errors.PasswordConfirm = "Neshoduje se s heslem";
	}


	//if errors is empty form is fine to submit
	return errors;
}

export default reduxForm({
	validate,
	form: "RegisterNewUser"
})(
	connect(null, { registerUser })(RegistrationForm)
);
