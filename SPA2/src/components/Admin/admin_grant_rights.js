import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { grantAdminRights, removeAdminRights } from '../../actions';
import Cookies from 'universal-cookie';
import { Field, reduxForm } from 'redux-form';

class AdminGrantRights extends Component{

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		const { grantRights } = field;
		if(!grantRights.waiting){
			if(grantRights.status === 403){
				hasError = "Práva tohoto uživatele nelze manipulovat!";
			}else if(grantRights.status === 204){
				hasError = "Vámi zadaný uživatel neexistuje!";
			}
		}


		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" {...field.input}  />
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(remove, data){
		const cookie = new Cookies();
		const token = cookie.get("user");

		console.log(data,remove, "<-------DATA")
		if(remove){
			this.props.removeAdminRights(data.Nickname, token); //pridat landing page game sucess
		}else{
			console.log("ASDADDWADAWD,", data)
			this.props.grantAdminRights(data.Nickname, token); //pridat landing page game sucess
		}
	}



	render(){
		const {handleSubmit} = this.props;
		return(
			<div>
				<form>
					<Field name="Nickname" label="Přezdívka" props={this.props} component={this.renderInputField} />
					<button onClick={handleSubmit(this.onSubmit.bind(this, false))} className="btn btn-primary">Přidat práva</button>
					<button onClick={handleSubmit(this.onSubmit.bind(this, true))} className="btn btn-primary">Odebrat práva</button>
				</form>
				<Link to="/user"><button className="btn btn-primary">Zpět</button></Link>
			</div>
		)
	}
}

function mapStatetoProps( {grantRights} ){
	return {grantRights};
}

export default reduxForm({
	form: "adminGrantRights"
})(connect(mapStatetoProps, { grantAdminRights, removeAdminRights })(AdminGrantRights))