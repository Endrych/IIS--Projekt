import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createTournament, fetchGameList } from "./../../actions";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

//musi zakladat admin

class TournamentNew extends Component {
	componentDidMount(){
		this.props.fetchGameList();
	}

	onSubmit = values => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		values.Game = values.Game ? [Number(values.Game)] : null;

		this.props.createTournament(values, token, ()=>{this.props.history.push("/tournaments")});
	};

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label  className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
				<input className="form-control" type={field.type} {...field.input} />
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
		console.log(field.selectOptions);
		return (
			<div className={className}>
				<label  className={field.require ? "require-fill" : ""}>
					<b>{field.label}</b>
				</label>
				<select className="form-control" {...field.input}>
					<option />
					{field.selectOptions.map(option => {
						return (
							<option key={option.Id} value={option.Id}>
								{option.Name}
							</option>
						);
					})}
				</select>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div className="row row__box">
				<div className="col col-sm-12">
					<h2>Založit turnaj</h2>
				</div>
				<div className="col col-sm-12">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Name" label="Jméno turnaje" component={this.renderInputField}require={true} />
						<Field name="Description" label="Popis turnaje" component={this.renderInputField} require={true} />
						<Field
							name="Game"
							label="Hra"
							component={this.renderSelectField}
							selectOptions={this.props.gameList.data}
							require={true}
						/>
						<button className="btn btn-primary" style={{marginRight: "5px"}}>Založit</button>
						<Link to="/tournaments">
							<button className="btn btn-danger">Zpět</button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}

function mapSateToProps({ gameList }) {
	return { gameList };
}

function validate(values){
	const errors = {};
	console.log("values")
	if(!values.Name){
		errors.Name = "Zadejte jméno turnaje.";
	}
	if(!values.Description){
		errors.Description = "Zadejte popis turnaje.";
	}
	if(!values.Game){
		errors.Game = "Vyberte hru ve které se turnaj koná.";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: "newTournament"
})(
	connect(
		mapSateToProps,
		{ createTournament, fetchGameList }
	)(TournamentNew)
);
