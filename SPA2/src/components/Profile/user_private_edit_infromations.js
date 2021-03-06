import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize  } from "redux-form";
import  { Link } from 'react-router-dom';
import { updateUserInformations } from '../../actions';
import GeneralValidators from "../../validators/general_validators";
import Cookies from 'universal-cookie';

class UserPrivateEditInformations extends Component{
	componentDidMount() {
		this.handleInitialize();
	  }


	handleInitialize() {
		const initData = {
		  "Firstname": this.props.userInformations.firstname,
		  "Lastname": this.props.userInformations.lastname,
		  "Phone": this.props.userInformations.phone,
		  "Email": this.props.userInformations.email
		};

		this.props.initialize(initData);
	  }

	renderField(field) {
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
			<div  className={className}>
				<label className={field.require ? "require-fill" : ""}><b>{field.label}</b></label>
				<input className="form-control" type={field.type} {...field.input} />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}


	onSubmit(values) {
		const cookies = new Cookies;

		const token = cookies.get("user");
		this.props.updateUserInformations(values, token, () => { this.props.history.push("/user")});
	}

	render(){
		const { handleSubmit } = this.props;

		// console.log("PROPS",this.props)
		return(
			<div className="row row__box">
				<div style={{marginBottom: "15px",marginTop: "15px"}} className="col col-sm-12">
					<h2>Upravit uživatelské informace</h2>
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="Firstname" label="Jméno"  component={this.renderField} require={true}/>
						<Field name="Lastname" label="Příjmení" component={this.renderField} require={true}/>
						<Field name="Email" label="Email" component={this.renderField} require={true} />
						<Field name="Phone" label="Telefon" component={this.renderField} />
						<button style={{marginRight: "5px"}} type="submit" className="btn btn-primary">
									Uložit
								</button>
						<Link to="/user"><button className="btn btn-danger">Zpět</button></Link>
					{/* <Field>{this.props.userInformations.email}</Field> */}
					{/* <Field>{this.props.userInformations.phone}</Field> */}
					</form>
				</div>
			{/* <div>Tým: <span>{this.props.userInformations.team ? this.props.userInformations.team : "Nejste členem žádnéo týmu"}</span></div> */}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {...state};
}


function validate(values) {
	const errors = {};
	const validator = new GeneralValidators();
	// validate inputs here
	if (!values.Firstname) {
		errors.Firstname = "Zadejte jmeno";
	} else if (!validator.AlphaCharacters(values.Firstname, { allowSpace: true })) {
		errors.Firstname = "Povoleny pouze znaky";
	} else if (!validator.Range(values.Firstname, { min: 1, max: 45 })) {
		errors.Firstname = "Povolena delka je 1-45 znaku";
	}

	if (!values.Lastname) {
		errors.Lastname = "Zadejte prijmeni";
	} else if (!validator.AlphaCharacters(values.Lastname, { allowSpace: true })) {
		errors.Lastname = "Povoleny pouze znaky";
	} else if (!validator.Range(values.Lastname, { min: 1, max: 45 })) {
		errors.Lastname = "Povolena delka je 1-45 znaku";
	}

	if (!values.Email) {
		errors.Email = "Zadejte vas Email";
	} else if (!validator.Email(values.Email)) {
		errors.Email = "Spatny format emailu";
	}

	//if errors is empty form is fine to submit
	return errors;
}


export default reduxForm({
	validate,
	form: "ChangeUserInfo"
})(
	connect(
		mapStateToProps, { updateUserInformations }
	)(UserPrivateEditInformations)
);
