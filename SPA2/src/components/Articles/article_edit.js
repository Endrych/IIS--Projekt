import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle, updateArticle, fetchGameList } from '../../actions';
import {Field, reduxForm} from 'redux-form';
import { Link } from "react-router-dom";
import GeneralValidators from "../../validators/general_validators";
import Cookies from "universal-cookie";

class ArticleEdit extends Component{
	componentDidMount(){
		this.props.fetchGameList();
		this.props.fetchArticle(this.props.articleid, this.handleInitialize.bind(this));
	}

	handleInitialize() {
		const initData = {
		  "Header": this.props.articleInfo.Header,
		  "Content": this.props.articleInfo.Content,
		//   "Image": this.props.articleInfo.Image,
		  "Game": this.props.articleInfo.Game.Id
		};

		this.props.initialize(initData);
	}

	onSubmit = (values)=>{
		const cookie = new Cookies();
		const token = cookie.get("user");

		console.log(values)
		values.Game = values.Game ? [Number(values.Game)] : null;

		this.props.updateArticle(this.props.articleid, values, token, ()=>{this.props.history.push("/user")});
		// this.props.history.push("/user")

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
				<label><b>{field.label}</b></label>
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
				<label><b>{field.label}</b></label>
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


	render(){

		const { handleSubmit } = this.props;
		console.log(this.props.gameList);
		const { articleInfo } = this.props;
		if(articleInfo.articleFetched){
			return(
				<div className="row row__box">
					<div className="col col-sm-12">
						<h2>Upravit článek </h2>
					</div>
					<div className="col col-sm-12">
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field name="Header" label="Nadpis" component={this.renderArticleHeaderField} />
							<Field name="Content" label="Obsah" component={this.renderArticleContentField} />
							{/* <Field
								name="Image"
								label="Obrázek"
								component={this.renderArticleImageField}
								type="file"
								value={null}
							/> */}
							<Field name="Game" label="Hra" component={this.renderSelectField} selectOptions={this.props.gameList.data} />
							<button style={{marginRight: "5px"}}type="submit" className="btn btn-primary">
								Ulozit
							</button>
							<Link to="/admin/articles"><button className="btn btn-danger">Zrušit</button></Link>
						</form>
					</div>
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

function mapSateToProps({articleInfo, loginStatus, gameList}){
	return {articleInfo, loginStatus, gameList};
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
})(connect(mapSateToProps, {fetchArticle, updateArticle, fetchGameList})(ArticleEdit));