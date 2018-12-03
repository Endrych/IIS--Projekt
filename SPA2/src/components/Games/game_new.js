import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import  { Link } from 'react-router-dom';
// import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";
import {createNewGame, getGenres, getPublishers} from '../../actions';

class GameNew extends Component{

	componentDidMount(){
		this.props.getGenres();
		this.props.getPublishers();
	}


	renderGameDescriptionField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label><b>{field.label}</b></label>
				<textarea rows="10" className="form-control" type={field.type} {...field.input} />
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
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b><i>{field.description}</i></label>
				<input className="form-control" {...field.input}  />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderInputFieldDate(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label ><b>{field.label}</b></label>
				<input className="form-control" {...field.input}  type="date"/>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderSelectField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label><b>{field.label}</b></label>
				<select  className="form-control" {...field.input} >
					<option></option>
					{field.selectOptions.map(option => {
						return <option key={option.Id} value={option.Id}>{option.Name}</option>
					})}
				</select>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderSelectField2(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label><b>{field.label}</b></label>
				<select  className="form-control" {...field.input} >
					<option></option>
					{field.selectOptions.map(option => {
						return <option key={option.Id} value={option.Name}>{option.Name}</option>
					})}
				</select>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}


	onSubmit(data){
		const cookie = new Cookies();
		const token = cookie.get("user");
		console.log(data);
		data.Video = data.Video ? data.Video.replace("watch?v=", "embed/") : "" ;
		data.Genres = data.Genres ? [Number(data.Genres)] : "";
		console.log(data, "DATA", data.Video.replace("watch?v=", "embed/") );

		this.props.createNewGame(data, token, ()=>{this.props.history.push("/admin/games")}); //pridat landing page game sucess
	}

	render(){
		const {handleSubmit} = this.props;
		return(
			<div className="row row__box">
				<div className="col col-sm-12">
					<h3>Nová hra</h3>
				</div>
				<div className="col col-sm-12">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Name" label="Název" component={this.renderInputField} require={true} />
						<Field name="Keyname" label="Klíčové jméno" component={this.renderInputField} require={true} />
						<Field name="ReleaseDate" label="Datum vydání" component={this.renderInputFieldDate} />
						<Field name="Description" label="Popis hry" component={this.renderGameDescriptionField} />
						<Field name="Publisher" label="Vydavatel" component={this.renderSelectField2} selectOptions={this.props.publishers.publishersArray}/>
						<Field name="Genres" label="Žánr" component={this.renderSelectField} selectOptions={this.props.genres.genresArray} />
						<Field name="Video" description={` (Povolena pouze youtube videa. Příklad: https://www.youtube.com/watch?v=c0mX-5q3mrYz )`} label="Odkaz na video" component={this.renderInputField} />
						<button style={{marginRight: "5px"}} className="btn btn-primary">Vytvořit</button>
						<Link to="/admin/games"><button  className="btn btn-danger">Zrušit</button></Link>
					</form>
				</div>
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

function mapStateToProps({genres, publishers}){
	console.log(publishers)
	return { genres, publishers };
}

export default reduxForm({
	validate,
	form: "NewGame"
})(connect(mapStateToProps, {createNewGame, getGenres, getPublishers})(GameNew));
