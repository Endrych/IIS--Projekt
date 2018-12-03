import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { getTeamInfo, updateTeamInfo  } from './../../actions';
import Cookies from 'universal-cookie';

class TeamEdit extends Component{
	componentDidMount(){
		this.props.getTeamInfo(this.props.id, this.handleInitialize.bind(this));
	}


	handleInitialize() {
		const { teamInfo } = this.props;

		const initData  = {
			Name: teamInfo.Name,
			Description: teamInfo.Description,
		}

		this.props.initialize(initData);
	}

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
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
				<label><b>{field.label}</b></label>
				<textarea rows="10" className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit = (values)=>{
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.updateTeamInfo(this.props.id, values, token, ()=>{this.props.history.push(`/team/${this.props.id}`)});
		// this.props.history.push("/user")
	}

	render(){
		const { handleSubmit } = this.props;
		return(
			<div  className="row row__box">
				<div className="col col-sm-12">
					<h2>Úprava informací týmu</h2>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Name" label="Jmeno týmu" component={this.renderInputField} require={true}/>
						<Field name="Description" label="Popis týmu" component={this.renderTextareaField} />
						<button className="btn btn-primary" style={{marginRight: "5px"}}>Uložit</button>
						<Link to={`/team/${this.props.id}`}><button className="btn btn-danger">Zrušit</button></Link>
					</form>
				</div>
			</div>
		)
	}
}


function validate(values){
	const errors = {};
	// validate inputs here
	if (!values.Name) {
		errors.Name = "Zadejte název týmu";
	}


	//if errors is empty form is fine to submit
	return errors;
}

function mapStateToProps({teamInfo}){
	return {teamInfo};
}

export default reduxForm({
	validate,
	form:"editTeamForm"
})(connect(mapStateToProps, {getTeamInfo, updateTeamInfo})(TeamEdit));