import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unsetTournamentModalValues, getTournamentDetails, setMatchResult } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import GeneralValidators from "../../validators/general_validators";
import Cookies from 'universal-cookie';

class TournamentModal extends Component{

	renderInputField = (field) => {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.user}</label>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit = (values) => {
		var cookies = new Cookies;
		var token = cookies.get("user");
		// values["User1"] = this.props.matchInfo.User1;
		// values["User2"] = this.props.matchInfo.User2;
		// console.log
		values["Id"] = this.props.matchInfo.Id;
		values["tournamentId"] = this.props.tournamentId;
		this.props.setMatchResult(token, values, this.props.getTournamentDetails);
		this.props.unsetTournamentModalValues();
		console.log(token, values, this.props.tournamentId);
	}

	unsetModal = (e) => {
		e.preventDefault();
		this.props.unsetTournamentModalValues();
	}

	render(){

		const { handleSubmit } = this.props;
		console.log(this.props.matchInfo)
		return(
			<div style={{position: "absolute", left: "50%", top: "50%", backgroundColor: "gray", width: "400px", height: "280px", transform: " translate(-50%, -50%)"}}>
				<form>
					<Field name="Score1" user={this.props.matchInfo.User1} component={this.renderInputField} />
					<Field name="Score2" user={this.props.matchInfo.User2} component={this.renderInputField} />
					<button className="btn btn-primary" onClick={handleSubmit(this.onSubmit.bind(this))}>Potvrdit</button>
					<button className="btn btn-danger" onClick={this.unsetModal}>Zpět</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps( {tournamentModal} ){
	console.log(tournamentModal)
	return {tournamentModal};
}

function validate(values) {
	const errors = {};
	const validator = new GeneralValidators();
	// validate inputs here
	if (!values.Score1) {
		errors.Score1 = "Zadejte vysledek";
	}else if (!validator.NumericCharacters(values.Score1)) {
		errors.Score1 = "Povoleny pouze ciselne hodnoty";
	}

	if (!values.Score2) {
		errors.Score2 = "Zadejte vysledek";
		// errors.Password_repeat = "Zadejte heslo";
	}else if (!validator.NumericCharacters(values.Score2)) {
		errors.Score2 = "Povoleny pouze ciselne hodnoty";
	}

	if (validator.EqualValue(values.Score2, { value: values.Score1 })) {
		// errors.Password = "Hesla se neshoduji";
		errors.Score2 = "Remíza není validní";
		errors.Score1 = "Remíza není validní";

	}

	//if errors is empty form is fine to submit
	return errors;
}

export default reduxForm({
	validate,
	form: "modalTounamentValues"
})(connect(mapStateToProps, {unsetTournamentModalValues, getTournamentDetails, setMatchResult})(TournamentModal))
