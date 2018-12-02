import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import  { Link } from 'react-router-dom';
// import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";
import {fetchGame, updateGame, getGenres} from '../../actions';

class GameEdit extends Component{
	componentDidMount(){
		this.props.getGenres();
		this.props.fetchGame(this.props.keyname, this.handleInitialize.bind(this))
	}


	handleInitialize() {
		const { gameInfo } = this.props;
		console.log(gameInfo)
		const initData  = {
			Name: gameInfo.Name,
			ReleaseDate: gameInfo.ReleaseDate,
			Description: gameInfo.Description,
			Publisher: gameInfo.PublisherId,
			Genres: gameInfo.Genres.length > 0 ? gameInfo.Genres[0].Id : [],
			Icon: gameInfo.Icon,
			Image: gameInfo.Image,
			Video: gameInfo.Video
		}

		this.props.initialize(initData);
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

	// renderImageField(field) {
	// 	const {
	// 		meta: { touched, error }
	// 	} = field;
	// 	let hasError = "";
	// 	let className = `form-group ${touched && error ? "has-danger" : ""}`;

	// 	return (
	// 		<div className={className}>
	// 			<label>{field.label}</label>
	// 			<input accept=".jpg, .png, .jpeg" className="form-control" type={field.type} onDrop={field.onDrop} />
	// 			{hasError}
	// 			<div className="text-help">{touched ? error : ""}</div>
	// 		</div>
	// 	);
	// }


	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label><b>{field.label}</b></label>
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
				<label><b>{field.label}</b></label>
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


	onSubmit(data){
		const cookie = new Cookies();
		const token = cookie.get("user");
		console.log(data);

		data.Genres = data.Genres ? [Number(data.Genres)] : "";
		console.log(data);
		this.props.updateGame(this.props.keyname, data, token, ()=>{this.props.history.push("/admin/games")}); //pridat landing page game sucess
	}

	render(){
		const {handleSubmit} = this.props;
		return(
			<div className="row row__box">
				<div className="col col-sm-12">
					<h3>Upravit informace o hře</h3>
				</div>
				<div className="col col-sm-12">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Name" label="Název" component={this.renderInputField} />
						<Field name="ReleaseDate" label="Datum vydání" component={this.renderInputFieldDate} />
						<Field name="Description" label="Popis hry" component={this.renderGameDescriptionField} />
						<Field name="Publisher" label="Vydavatel" component={this.renderInputField} />
						<Field name="Genres" label="Žánr" component={this.renderSelectField} selectOptions={this.props.genres.genresArray}  />
						{/* <Field name="Icon" label="Ikona" type="file" component={this.renderImageField} /> */}
						{/* <Field name="Image" label="Obrázek" type="file" component={this.renderImageField} /> */}
						<Field name="Video" label="Odkaz na video" component={this.renderInputField} />
						<button className="btn btn-primary" style={{marginRight: "5px"}}>Uložit</button>
						<Link to="/admin/games"><button  className="btn btn-danger">Zrušit</button></Link>
					</form>
				</div>
			</div>
		)
	}
}


function validate(values) {
	const errors = {};
	if (!values.Name) {
		errors.Name = "Zadejte název hry";
	}

	if (!values.Keyname) {
		errors.Keyname = "Zadejte klíčové jméno";
	}
	return errors;
}

function mapStateToProps({ gameInfo, genres }){
	return{gameInfo, genres};
}

export default reduxForm({
	validate,
	form: "EditGame"
})(connect(mapStateToProps, {updateGame, fetchGame, getGenres})(GameEdit));
