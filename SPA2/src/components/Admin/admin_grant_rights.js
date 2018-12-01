import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { grantAdminRights, removeAdminRights, deactivateAccount, resetManagnePlayersState } from '../../actions';
import Cookies from 'universal-cookie';
import { Field, reduxForm } from 'redux-form';

class AdminGrantRights extends Component{

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		let toRender = "";
		const { managePlayers } = field;
		const { grantRights } = field;
		if(!grantRights.waiting){
			if(grantRights.status === 403){
				hasError = "Práva tohoto uživatele nelze manipulovat!";
			}else if(grantRights.status === 204){
				hasError = "Vámi zadaný uživatel neexistuje!";
			}else{
				if(managePlayers.try){
					switch(managePlayers.type){
						case "GRANT_SUCESS":
							toRender = <div className="success">Práva úspěšně přidána</div>;
							break;
						case "GRANT_FAILED":
							toRender = <div className="error">Práva se nezdařilo přidat</div>;
							break;
						case "REMOVE_SUCESS":
							toRender = <div className="success">Práva úspěšně odebrána</div>;
							break;
						case "REMOVE_FAILED":
							toRender = <div className="error">Práva se nezdařilo odebrat</div>;
							break;
						case "DEACTIVATE_SUCESS":
							toRender = <div className="success">Deaktivace proběhla úspěšně</div>;
							break;
						case "DEACTIVATE_FAILED":
							toRender = <div className="error">Deaktivace se nezdařila</div>;
							break;
					}
				}
			}
		}

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" {...field.input}  />
				{toRender}
				{hasError}
				<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}

	onSubmit(action, data){
		const cookie = new Cookies();
		const token = cookie.get("user");

		if(action === "remove"){
			this.props.removeAdminRights(data.Nickname, token, this.props.resetManagnePlayersState); //pridat landing page game sucess
		}else if(action === "grant"){
			this.props.grantAdminRights(data.Nickname, token, this.props.resetManagnePlayersState); //pridat landing page game sucess
		}else if(action === "deactivate"){
			this.props.deactivateAccount(data.Nickname, token, this.props.resetManagnePlayersState); //pridat landing page game sucess

		}
	}



	render(){
		const {handleSubmit, managePlayers} = this.props;

		return(
			<div>
				<form>
					<Field name="Nickname" label="Přezdívka" managePlayers={managePlayers} props={this.props} component={this.renderInputField} />
					<button onClick={handleSubmit(this.onSubmit.bind(this, "grant"))} className="btn btn-primary">Přidat práva</button>
					<button onClick={handleSubmit(this.onSubmit.bind(this, "remove"))} className="btn btn-primary">Odebrat práva</button>
					<button onClick={handleSubmit(this.onSubmit.bind(this, "deactivate"))} className="btn btn-danger">Deaktivovat účet</button>
				</form>
				<Link to="/user"><button className="btn btn-primary">Zpět</button></Link>
			</div>
		)
	}
}

function mapStatetoProps( {grantRights, managePlayers} ){
	console.log("MANAGE PLAYERS" , managePlayers);
	return {grantRights, managePlayers};
}

export default reduxForm({
	form: "adminGrantRights"
})(connect(mapStatetoProps, { grantAdminRights, removeAdminRights, deactivateAccount, resetManagnePlayersState })(AdminGrantRights))