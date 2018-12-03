import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { grantAdminRights, removeAdminRights, deactivateAccount, resetManagnePlayersState, insertModal } from '../../actions';
import Cookies from 'universal-cookie';
import { Field, reduxForm } from 'redux-form';
import Modal from '../Modal/modal';

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

		if(!grantRights.waiting || managePlayers.try){
			if(grantRights.status === 403){
				hasError = <div className="text-danger">Práva tohoto uživatele nelze manipulovat!</div>;
			}else if(grantRights.status === 204){
				hasError = <div className="text-danger">Vámi zadaný uživatel neexistuje!</div>;
			}else{
				if(managePlayers.try){
					switch(managePlayers.type){
						case "GRANT_SUCESS":
							toRender = <div className="text-success">Práva úspěšně přidána</div>;
							break;
						case "GRANT_FAILED":
							toRender = <div className="text-danger">Práva se nezdařilo přidat</div>;
							break;
						case "REMOVE_SUCESS":
							toRender = <div className="text-success">Práva úspěšně odebrána</div>;
							break;
						case "REMOVE_FAILED":
							toRender = <div className="text-danger">Práva se nezdařilo odebrat</div>;
							break;
						case "DEACTIVATE_SUCESS":
							toRender = <div className="text-success">Deaktivace proběhla úspěšně</div>;
							break;
						case "DEACTIVATE_FAILED":
							toRender = <div className="text-danger">Deaktivace se nezdařila</div>;
							break;
					}
				}
			}
		}

		return (
			<div className={className}>
				<label><b>{field.label}</b></label>
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
			this.props.insertModal(data.Nickname); //pridat landing page game sucess

		}
	}

	handleDeactivateAccount = (nickname) =>{
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.deactivateAccount( nickname, token, this.props.resetManagnePlayersState)
	}

	render(){
		const {handleSubmit, managePlayers} = this.props;

		return(
			<div className="row row__box">
				<div className="col col-sm-12">
					<form>
						<div className="col col-sm-12">
							<Field name="Nickname" label="Přezdívka" managePlayers={managePlayers} props={this.props} component={this.renderInputField} />
						</div>
						<div className="col col-sm-12">
							<button style={{marginRight: "5px"}} onClick={handleSubmit(this.onSubmit.bind(this, "grant"))} className="btn btn-primary">Přidat práva</button>
							<button style={{marginRight: "5px"}} onClick={handleSubmit(this.onSubmit.bind(this, "remove"))} className="btn btn-primary">Odebrat práva</button>
							<button onClick={handleSubmit(this.onSubmit.bind(this, "deactivate"))} className="btn btn-danger">Deaktivovat účet</button>
							{this.props.modal.show  ? <Modal displayText={`Potvrďte deaktivaci účtu`} callback={this.handleDeactivateAccount.bind(this, this.props.modal.value)} /> : "" }

						</div>
					</form>
					<div className="col col-sm-12">
						<Link to="/user"><button  style={{marginTop: "5px"}} className="btn btn-primary">Zpět</button></Link>
					</div>
				</div>
			</div>
		)
	}
}

function mapStatetoProps( {grantRights, managePlayers, modal} ){
	return {grantRights, managePlayers, modal};
}

export default reduxForm({
	form: "adminGrantRights"
})(connect(mapStatetoProps, { grantAdminRights, removeAdminRights, deactivateAccount, resetManagnePlayersState, insertModal })(AdminGrantRights))