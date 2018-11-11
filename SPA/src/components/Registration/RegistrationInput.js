import React, { Component } from "react";
import { Col, Row, FormGroup } from "reactstrap";

import "../../styles/Register/RegistrationInput.css"

class RegistrationInput extends Component {
	state = {
		isValid: false,
		isEdited: false,
		errorMessage: this.props.errorMessage || "Neco je spatne"
	};

	test(){
		console.log("SADASDSDA")
			let validationPassed = this.executeValidation();
			console.log(validationPassed)
			this.setState(() => {
				return { isValid: validationPassed, isEdited: true };
			});
	}

	handleChange = event => {
		let name = event.target.name;
		let value = event.target.value;
		this.props.onHandleChangeOnInput(value, name);
	};

	executeValidation = value => {
		if (this.props.validations) {
			let validationArray = this.props.validations;
			for (let i = 0; i < validationArray.length; i++) {
				let validator = validationArray[i].validator(value, validationArray[i].options);
				if (validator === false) {
					return false;
				}
			}
		}
		return true;
	};

	handleValidation = (event) => {
		let validationPassed = this.executeValidation(event.target.value);
		this.setState(() => {
			return { isValid: validationPassed, isEdited: true };
		});

		let name = event.target.name;
		console.log(validationPassed)
		this.props.onHandleErrorOnBlur(validationPassed, name);
		// if (!validationPassed) {
		// 	this.handleError(event.target);
		// }
	}

	getCorrectClassName = () => {
		if (this.state.isEdited) {
			return this.state.isValid ? "register__input-correct" : "register__input-error";
		}
	};

	returnErrorDom = () => {
		return <div className="register__text-error">{this.state.errorMessage}</div>;
	}



	render() {

		return (
			<Row>
				<Col xs="12" sm="12">
					<FormGroup>
						<div className="registration__label">{this.props.labelText}</div>
						<input
							className={`${this.getCorrectClassName()} register__input`}
							type={this.props.type}
							name={this.props.name}
							onChange={this.handleChange}
							onBlur={this.handleValidation}
						/>
						{!this.state.isValid && this.state.isEdited ? this.returnErrorDom() : ""}
					</FormGroup>
				</Col>
			</Row>
		);
	}
}

export default RegistrationInput;
