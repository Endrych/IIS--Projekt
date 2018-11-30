import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createTournament, RESET_INVITE_REDUCER_VALUES } from './../../actions';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class TournamentNew extends Component{
	// componentDidMount(){

	// }

	onSubmit = (values) => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.createTournament(values, token);
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

	render(){

		const { handleSubmit } = this.props;

		return(
			<div>
				<h2>Založit turnaj</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Name" label="Jméno turnaje" component={this.renderInputField} />
					<Field name="Description" label="Popis turnaje" component={this.renderInputField} />
					<button className="btn btn-primary">Založit</button>
					<Link to="/tournaments"><button className="btn btn-danger">Zpět</button></Link>
				</form>
			</div>
		)
	}
}

export default reduxForm({
	// validate,
	form: "newTournament"
})(connect(null, { createTournament })(TournamentNew))