import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTeamInfo, kickTeamMember, leaveTeam, deleteTeam, sendInvite, resetInviteStatus } from "../../actions";
import Cookies from 'universal-cookie';
// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//
import { Field, reduxForm , reset} from 'redux-form';

class TeamShow extends Component {
	componentDidMount() {
		this.props.getTeamInfo(this.props.id);
	}

	getPlayerDom = player => {
		const canKick = (this.props.loginStatus.nickname === this.props.teamInfo.Owner) && (player.Nickname !== this.props.teamInfo.Owner);
		return (
			<div key={player.Nickname}>
				{player.Nickname} <span>{player.Nickname === this.props.teamInfo.Owner ? " (Zakladatel)" : " (Člen)"}</span> {canKick ? <span><button onClick={this.removeTeamMember.bind(this, player.Nickname)} className="btn btn-danger"> Kick </button> </span>: ""}
			</div>
		);
	};

	renderInputField(field) {
		const {
			meta: { touched, error }
		} = field;
		let hasError = "";
		let className = `form-group ${touched && error ? "has-danger" : ""}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type={field.type} {...field.input} />
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
				<form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<Field name="player" label="Pozvat hráče do týmu:" component={this.renderInputField} />
					<button className="btn btn-secondary">Poslat pozvanku</button>
				</form>
				{!sendInviteInfo.send ? "" : sendInviteInfo.sendSucess ? <div>Pozvánka odeslána</div> : <div>Odeslání pozvánky se nezdařilo</div>}
				<Link to={`/team/edit/${this.props.id}`}><button className="btn btn-primary">Editovat informace</button></Link>
				<button onClick={this.onDeleteTeam.bind(this)} className="btn btn-danger">Smazat tým</button>
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
				<button className="btn btn-primary" onClick={this.leaveTeam.bind(this)}>Opustit tým</button>
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
				<h2>{info.Name}</h2>
				<div>Datum založení: {new Date(info.Created).toLocaleDateString("cs-CS", options)}</div>
				<div>
					Zakladatel: <Link to={`/players/${info.Owner}`}>{info.Owner}</Link>
				</div>
				<div>{info.Description}</div>

				<div>Seznam členů</div>
				<div>{this.generateListOfPlayers(info.Users)}</div>
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

		return <div>{toRender}</div>;
	}
}

function mapStateToProps({ teamInfo, loginStatus, sendInviteInfo }) {
	return { teamInfo, loginStatus, sendInviteInfo };
}

export default reduxForm({
	form: "invitedPlayer"
}) (connect(
	mapStateToProps,
	{ getTeamInfo, kickTeamMember, leaveTeam, deleteTeam, sendInvite, resetInviteStatus }
)(TeamShow));
