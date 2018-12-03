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

		const styleInput = { borderRadius: "0px", borderTopLeftRadius: ".25em",  borderBottomLeftRadius: ".25em"}

		return (
			<div className={className} style={{margin: "0px"}} >
				<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
					<input style={styleInput} className="form-control" type={field.type} {...field.input} />
				</div>
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>

			</div>
		);
	}

	onSubmit = (values) => {

		this.props.getSearchResults(values.Expression, ()=>{this.props.history.push("/search/results")});
	}

	render(){
		const styleButton = { borderRadius: "0px", borderTopRightRadius: ".25em",  borderBottomRightRadius: ".25em", borderLeft: "none"}

		return (
			<div className="col col-xs-12 col-sm-4">
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
					<Field name="Expression" component={this.renderInputField} />
					<button style={styleButton} className="btn btn-secondary">Hledat</button>
				</form>
			</div>
		)
	}
}


export default reduxForm({
	// validate,
	form: "searchBar"
})(withRouter(connect(null, {getSearchResults})(SearchBar)))