import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle, updateArticle } from '../../actions';
import {Field, reduxForm} from 'redux-form';
import { Link } from "react-router-dom";
import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";

class ArticleEdit extends Component{
	componentDidMount(){
		console.log(this.props)
		this.props.fetchArticle(this.props.articleid, this.handleInitialize.bind(this));
	}

	handleInitialize() {
		console.log("THIS", this.props)
		const initData = {
		  "Header": this.props.articleInfo.Header,
		  "Content": this.props.articleInfo.Content,
		  "Image": this.props.articleInfo.Image,
		  "Game": this.props.articleInfo.Game
		};

		this.props.initialize(initData);
	}

	pushHistory = () => {
		console.log(this.props)
	}

	onSubmit = (values)=>{
		console.log("Submit", this.props);
		const cookie = new Cookies();
		const token = cookie.get("user");
		// this.props.updateArticle(this.props.articleid, values, token,  this.pushHistory.bind(this));
		this.props.history.push("/user")

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

		console.log("wooooosh", this.props);
		const { articleInfo } = this.props;
		if(articleInfo.articleFetched){
			return(
				<div>
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
							Ulozit
						</button>
						<Link to="/admin/articles"><button className="btn btn-danger">Zrušit</button></Link>
					</form>
				</div>)
		}else{
			return(
				<div>
					Fetching article please wait.
				</div>
			)
		}
	}
}

function mapSateToProps({articleInfo, loginStatus}){
	return {articleInfo, loginStatus};
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

export default reduxForm({
	validate,
	form: "EditArticle"
})(connect(mapSateToProps, {fetchArticle, updateArticle})(ArticleEdit));