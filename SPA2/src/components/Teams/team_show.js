import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTeamInfo, kickTeamMember, leaveTeam, deleteTeam, sendInvite, resetInviteStatus, insertModal } from "../../actions";
import Cookies from 'universal-cookie';
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
import Modal from './../Modal/modal';
//
import { Field, reduxForm , reset} from 'redux-form';

class TeamShow extends Component {
	componentDidMount() {
		this.props.getTeamInfo(this.props.id);
	}

	getPlayerDom = player => {
		const canKick = (this.props.loginStatus.nickname === this.props.teamInfo.Owner) && (player.Nickname !== this.props.teamInfo.Owner);
		return (
			<div style={{marginBottom: "5px"}}key={player.Nickname}>
				{player.Nickname} <span>{player.Nickname === this.props.teamInfo.Owner ? " (Zakladatel)" : " (Člen)"}</span> {canKick ? <span><button onClick={this.handleInsertModal.bind(this, player.Nickname)} className="btn btn-danger" style={{lineHeight: "1", marginLeft: "25px"}}> Vyhodit </button> </span>: ""}
				{this.props.modal.show ? this.props.modal.value === player.Nickname ? <Modal displayText={`Vyhodit hráče ${player.Nickname}`} callback={this.removeTeamMember.bind(this, player.Nickname)} /> : "" : "" }

			</div>
		);
	};

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;


		const styleButton1 = { borderRadius: "0px", borderTopRightRadius: ".25em",  borderBottomRightRadius: ".25em", borderLeft: "none"}
		const styleButton2 = { borderRadius: "0px", borderTopLeftRadius: ".25em",  borderBottomLeftRadius: ".25em"}


		return (
			<div style={{marginTop: "10px"}}className={className}>
				<label><h4>{field.label}</h4></label>
				<div style={{display: "flex", alignItems: "center"}}>
					<input style={styleButton2} className="form-control" type={field.type} {...field.input} />
					<button style={styleButton1}  className="btn btn-secondary">Poslat pozvánku</button>
				</div>
					{hasError}
					<div className="text-help">{touched ? error : ""}</div>
			</div>
		);
	}


	removeTeamMember = player =>{
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.kickTeamMember(player, token, this.props.getTeamInfo.bind(this, this.props.id));
	}

	generateListOfPlayers = players => {
		let arrOfPlayers = [];
		for (let i = 0; i < players.length; i++) {
			arrOfPlayers.push(this.getPlayerDom(players[i]));
		}
		return arrOfPlayers;
	};

	onSubmit = (values) => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.sendInvite(token, values.player, this.props.resetInviteStatus);
		this.props.dispatch(reset("invitedPlayer"));
	}

	renderOwnerButtons = () =>{
		const { sendInviteInfo } = this.props;
		return(
			<div>
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))} style={{display: "flex", alignItems: "center"}}>
					<Field name="player" label="Pozvat hráče do týmu" component={this.renderInputField} />
				</form>
				{!sendInviteInfo.send ? "" : sendInviteInfo.sendSucess ? <div className="text-success">Pozvánka odeslána</div> : <div className="text-danger">Odeslání pozvánky se nezdařilo</div>}
				<Link to={`/team/edit/${this.props.id}`} style={{marginRight: "5px"}}><button className="btn btn-primary">Editovat informace</button></Link>
				<button onClick={this.handleInsertModal.bind(this, this.props.id)} className="btn btn-danger">Zrušit tým</button>
				{this.props.modal.show ? this.props.modal.value === this.props.id ? <Modal displayText={`Zrušit tým ${this.props.teamInfo.Name}`} callback={this.onDeleteTeam.bind(this)} /> : "" : "" }

			</div>
		)
	}

	onDeleteTeam = () => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.deleteTeam(this.props.id, token, ()=>{this.props.history.push("/user")});
	}

	renderMemberButton = () =>{
		return(
			<div>
				{this.props.modal.show ? this.props.modal.value === this.props.id ? <Modal displayText={`Opustit tým ${this.props.teamInfo.Name}`} callback={this.leaveTeam.bind(this)} /> : "" : "" }
				<button className="btn btn-danger" onClick={this.handleInsertModal.bind(this, this.props.id)}>Opustit tým</button>
			</div>
		)
	}

	leaveTeam = () => {
		const cookie = new Cookies();
		const token = cookie.get("user");
		this.props.leaveTeam(token, ()=>{this.props.history.push("/user")});
	}

	getTeamDom = info => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return (
			<div>
				<h2>Tým {info.Name}</h2>
				<div>Datum založení: {new Date(info.Created).toLocaleDateString("cs-CS", options)}</div>
				<div>
					Zakladatel: <Link to={`/players/${info.Owner}`}>{info.Owner}</Link>
				</div>
				<div>Popis: {info.Description}</div>
				<br />
				<div><h4>Seznam členů</h4></div>
				<div>{this.generateListOfPlayers(info.Users)}</div>
				<br />
				{this.props.loginStatus.nickname === this.props.teamInfo.Owner ? this.renderOwnerButtons(this) : this.checkUser(info.Users)  ? this.renderMemberButton() : ""}
			</div>
		);
	};

	checkUser = (users) => {
		const loginNickname = this.props.loginStatus.nickname;

		for(let i = 0; i < users.length; i++){
			if(loginNickname === users[i].Nickname){
				return true;
			}
		}

		return false;
	}

	handleInsertModal = (id) => {
		this.props.insertModal(id)
	}

	render() {
		const { teamInfo } = this.props;
		let toRender;
		if (teamInfo.fetched) {
			if (teamInfo.fetchSucess) {
				toRender = this.getTeamDom(teamInfo);
			} else {
				toRender = <div>Tým neexistuje!</div>;
			}
		} else {
			toRender = <div>Vyhledávám tým. Prosím počkejte.</div>;
		}

		return <div className="row row__box">{toRender}</div>;
	}
}

function mapStateToProps({ teamInfo, loginStatus, sendInviteInfo, modal }) {
	return { teamInfo, loginStatus, sendInviteInfo, modal };
}

export default reduxForm({
	form: "invitedPlayer"
}) (connect(
	mapStateToProps,
	{ getTeamInfo, kickTeamMember, leaveTeam, deleteTeam, sendInvite, resetInviteStatus, insertModal }
)(TeamShow));
