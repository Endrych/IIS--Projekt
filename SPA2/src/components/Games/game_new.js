import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import  { Link } from 'react-router-dom';
// import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";
import {createNewGame} from '../../actions';

class GameNew extends Component{

	renderGameDescriptionField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea rows="10" className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderImageField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input accept=".jpg, .png, .jpeg" className="form-control" type={field.type} onDrop={field.onDrop} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}


	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" {...field.input}  />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(data){
		const cookie = new Cookies();
		const token = cookie.get("user");

		console.log(data, "<-------DATA")
		this.props.createNewGame(data, token, ()=>{this.props.history.push("/games")}); //pridat landing page game sucess
	}

	render(){
		const {handleSubmit} = this.props;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Name" label="Název" component={this.renderInputField} />
					<Field name="Keyname" label="Klíčové jméno" component={this.renderInputField} />
					<Field name="ReleaseDate" label="Datum vydání" component={this.renderInputField} />
					<Field name="Description" label="Popis hry" component={this.renderGameDescriptionField} />
					<Field name="PublisherId" label="Vydavatel" component={this.renderInputField} />
					<Field name="Icon" label="Ikona" type="file" component={this.renderImageField} />
					<Field name="Image" label="Obrázek" type="file" component={this.renderImageField} />
					<Field name="Video" label="Odkaz na video" component={this.renderInputField} />
					<button className="btn btn-primary">Vytvořit</button>
					<Link to="/admin/games"><button  className="btn btn-danger">Zrušit</button></Link>
				</form>
			</div>
		)
	}
}


function validate(values) {
	const errors = {};
	// const validator = new GeneralValidators();
	// validate inputs here
	if (!values.Name) {
		errors.Name = "Zadejte název hry";
	}

	if (!values.Keyname) {
		errors.Keyname = "Zadejte klíčové jméno";
	}
	//if errors is empty form is fine to submit
	return errors;
}


export default reduxForm({
	validate,
	form: "NewGame"
})(connect(null, {createNewGame})(GameNew));
