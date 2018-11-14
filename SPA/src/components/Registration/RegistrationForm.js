import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

import registrationFields from "../../enums/registrationFields.js";
import fieldTypes from "../../enums/fieldTypes.js";
import errorMessages from "../../enums/registerErrorMessages.js";
import RegistrationInput from "./RegistrationInput.js";
import GeneralValidators from  "../../validators/GeneralValidators.js"


class RegistrationForm extends Component {
	constructor(props){
		super(props);
		this.textInput = React.createRef();
	}
	state = {
		data: {
			Nickname: "",
			Firstname: "",
			Lastname: "",
			Password: "",
			PasswordConfirm: "",
			Email: "",
			Phone: ""
		},
		errors: {
			Nickname: false,
			Firstname: false,
			Lastname: false,
			Password: false,
			PasswordConfirm: false,
			Email: false,
			Phone: true
		},
	};

	checkIfInputsAreValid = () => {
		for (let key in this.state.errors){
			if(!this.state.errors[key]){
				return false;
			}
		}
		return true;
	}

	submitForm(e) {
		e.preventDefault();
		let data = this.state.data;
		let isValid = this.checkIfInputsAreValid();
		console.log(isValid)
		if(isValid){
			let axiosInstance = axios.create({
				baseURL: "http://localhost:5050"
				/* other custom settings */
			});
			axiosInstance.post("/user/register", data).then(res => {
				console.log(res);
			});
		}else{
			this.textInput.current.test();
		}

		console.log(this.state)

	}
	cancelForm(e) {
		e.preventDefault();
		this.props.history.push('/');
	}

	handleChangeOnInput = (value, state) => {
		this.setState(prevState => {
			return {
				data: {
					...prevState.data,
					[state]: value
				}
			};
		});
		// console.log(this.state);
	};


	handleErrorOnBlur = (value, state) => {
		console.log(value, state)
		this.setState(prevState => {
			return {
				errors: {
					...prevState.errors,
					[state]: value
				}
			};
		});
		console.log(this.state);
	};

	render() {
		var validator = new GeneralValidators;

		return (
			<Row>
				<Col xs="12" sm="12" className="favorite__game-wrapper">
					<RegistrationInput
						name="Nickname"
						labelText={registrationFields.NICKNAME}
						type={fieldTypes.TEXT}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.AlphaNumericCharacters, options:{}},{validator: validator.Range, options:{min:4, max:45}}]}
						errorMessage={errorMessages.NICKNAME}
						ref={this.textInput}
					/>
					<RegistrationInput
						name="Firstname"
						labelText={registrationFields.FIRSTNAME}
						type={fieldTypes.TEXT}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.AlphaCharacters, options:{}}, {validator: validator.Range, options:{min:1, max:45}}]}
						errorMessage={errorMessages.FIRSTNAME}
						// ref={this.textInput}
						/>
					<RegistrationInput
						name="Lastname"
						labelText={registrationFields.LASTNAME}
						type={fieldTypes.TEXT}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.AlphaCharacters, options:{}}, {validator: validator.Range, options:{min:1, max:45}}]}
						errorMessage={errorMessages.LASTNAME}
						// ref={this.textInput}
						/>
					<RegistrationInput
						name="Email"
						labelText={registrationFields.EMAIL}
						type={fieldTypes.TEXT}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.Email, options:{}}]}
						errorMessage={errorMessages.EMAIL}
						// ref={this.textInput}
						/>
					<RegistrationInput
						name="Phone"
						labelText={registrationFields.PHONE_NUMBER}
						type={fieldTypes.TEXT}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.PhoneNumber, options:{}}]}
						errorMessage={errorMessages.PHONE_NUMBER}
						// ref={this.textInput}
						/>
					<RegistrationInput
						name="Password"
						labelText={registrationFields.PASSWORD}
						type={fieldTypes.PASSWORD}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.AlphaNumericCharacters, options:{}}, {validator: validator.Min, options:{min:6}}]}
						errorMessage={errorMessages.PASSWORD}
						// ref={this.textInput}
						/>
					<RegistrationInput
						name="PasswordConfirm"
						labelText={registrationFields.REPEATED_PASSWORD}
						type={fieldTypes.PASSWORD}
						onHandleChangeOnInput={this.handleChangeOnInput}
						onHandleErrorOnBlur={this.handleErrorOnBlur}
						validations={[{validator: validator.AlphaNumericCharacters, options:{}}, {validator: validator.EqualValue, options:{value:this.state.data.Password}}]}
						errorMessage={errorMessages.CONFIRN_PASSWORD}
						// ref={this.textInput}
						/>
					<Row>
						<Col xs="12" sm="12">
							<button onClick={this.submitForm.bind(this)}>
								{registrationFields.SUBMIT}
							</button>
							<button onClick={this.cancelForm.bind(this)}>
								{registrationFields.CANCEL}
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default RegistrationForm;
