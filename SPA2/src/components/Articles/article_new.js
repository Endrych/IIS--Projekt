import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { postNewArticle, fetchGameList } from "../../actions";
import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";
import { Redirect } from "react-router";

class ArticleNew extends Component {
	//je potreba udelat select her -> fetchnout data o hrach
	componentDidMount(){
		this.props.fetchGameList();
	}

	onSubmit(values) {
		//Select transform number from string to number
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

		return (
			<div className={className}>
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
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

		return (
			<div className={className}>
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
				<textarea rows="10" className="form-control" type={field.type} {...field.input} />
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

		return (
			<div className={className}>
				<label>{field.label}</label>
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
		console.log(field.selectOptions)
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

	renderForAdmin(handleSubmit) {
		return (
			<div className="col col-sm-12">
				<h2>Nový článek</h2>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="Header" label="Nadpis" component={this.renderArticleHeaderField} require={true}/>
					<Field name="Content" label="Obsah" component={this.renderArticleContentField} require={true}/>
					<Field name="Game" label="Hra" component={this.renderSelectField} selectOptions={this.props.gameList.data}/>
					<button style={{marginRight: "5px"}} type="submit" className="btn btn-primary">
						Publikovat
					</button>
					<Link to="/admin/articles"><button className="btn btn-danger">Zrušit</button></Link>
				</form>
			</div>
		);
	}


	render() {
		const { handleSubmit } = this.props;
		let toRender;
		if (this.props.loginStatus.admin > 0) {
			toRender = this.renderForAdmin(handleSubmit);
		}else{
			toRender =<Redirect  to="/" />;
		}
		// if(me.props.user)

		return (
			<div className="row row__box">
				{toRender}
			</div>
		);
	}
}



function validate(values) {
	const errors = {};
	const validator = new GeneralValidators();
	// validate inputs here
	if (!values.Header) {
		errors.Header = "Zadejte nadpis";
	}

	if (!validator.Min(values.Content, { min: 20 })) {
		errors.Content = "Obsah musí mít aspoň 20 znaků.";
	}

	//if errors is empty form is fine to submit
	return errors;
}

function mapStateToProps(state) {
	return state;
}

export default reduxForm({
	validate,
	form: "NewArticleForm"
})(
	connect(
		mapStateToProps,
		{ postNewArticle,fetchGameList  }
	)(ArticleNew)
);
