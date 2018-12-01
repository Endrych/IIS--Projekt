import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { getSearchResults  } from '../../actions';

class SearchBar extends Component{

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit = (values) => {
		console.log(values)

		this.props.getSearchResults(values.Expression, ()=>{this.props.history.push("/search/results")});
	}

	render(){
		console.log(this.props)
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Expression" component={this.renderInputField} />
					<button className="btn btn-secondary">Hledat</button>
				</form>
				ASD
			</div>
		)
	}
}


export default reduxForm({
	// validate,
	form: "searchBar"
})(withRouter(connect(null, {getSearchResults})(SearchBar)))