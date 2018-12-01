import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createTeam } from './../../actions';
import Cookies from 'universal-cookie';

class TeamCreateNew extends Component{
	componentDidMount(){

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
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderTextareaField(field) {
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

	onSubmit = (values)=>{
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.createTeam(values, token, ()=>{this.props.history.push("/user")});
		// this.props.history.push("/user")

	}

	render(){
		const { handleSubmit } = this.props;

		return(
			<div>
				<h2>Založit nový tým</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Name" label="Jmeno týmu" component={this.renderInputField} />
					<Field name="Description" label="Popis týmu" component={this.renderTextareaField} />
					<Field name="Logo" label="Logo týmu" type="file" component={this.renderImageField} />
					<button className="btn btn-primary">Vytvořit</button>
					<Link to="/user"><button className="btn btn-danger">Zrušit</button></Link>
				</form>
			</div>
		)
	}
}

export default reduxForm({
	// validate,
	form: "newTeam"
})(connect(null, {createTeam})(TeamCreateNew))