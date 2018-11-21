import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { postNewArticle } from "../../actions";
import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";

class ArticleNew extends Component {
	//je potreba udelat select her -> fetchnout data o hrach

	onSubmit(values) {
		//Select transform number from string to number
		console.log("||||||||||||", values);
		var cookies = new Cookies();

		var token = cookies.get("user");
		this.props.postNewArticle(values, token,() => { this.props.history.push("/article/new/sucess")});
	}

	renderArticleHeaderField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		console.log("FIELD arARTICLE", field);
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderArticleContentField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		console.log("FIELD arARTICLE", field);
		return (
			<div className={className}>
				<label>{field.label}</label>
				<textarea rows="10" className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderArticleImageField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		console.log("FIELD arARTICLE", field);
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input accept=".jpg, .png, .jpeg" className="form-control" type={field.type} onDrop={field.onDrop} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderArticleGameSelectField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		// if (field.label === registrationFields.NICKNAME) {
		// 	var getError = field.statusCode;
		// 	if (getError === 303) {
		// 		className = `form-group has-danger`;
		// 		hasError = <div className="text-help">{registerCodes.code_303}</div>;
		// 	}
		// }

		console.log("FIELD arARTICLE", field);
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	renderForAdmin(handleSubmit) {
		return (
			<div>
				<h2>Nový článek</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Header" label="Nadpis" component={this.renderArticleHeaderField} />
					<Field name="Content" label="Obsah" component={this.renderArticleContentField} />
					<Field
						name="Image"
						label="Obrázek"
						component={this.renderArticleImageField}
						type="file"
						value={null}
					/>
					<Field name="Game" label="Hra" component={this.renderArticleGameSelectField} />
					<button type="submit" className="btn btn-primary">
						Publikovat
					</button>
					<Link to="/"><button className="btn btn-danger">Zrušit</button></Link>
				</form>
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;
		console.log(this.props.loginStatus.admin);
		let toRender;
		if (this.props.loginStatus.admin > 0) {
			toRender = this.renderForAdmin(handleSubmit);
		}else{
			toRender =<Redirect  to="/" />;
		}
		// if(me.props.user)

		return (
			<div>
				{toRender}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default reduxForm({
	// validate,
	form: "NewArticleForm"
})(
	connect(
		mapStateToProps,
		{ postNewArticle }
	)(ArticleNew)
);
