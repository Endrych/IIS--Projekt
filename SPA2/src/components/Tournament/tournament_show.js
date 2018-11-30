import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getTournamentDetails, getLoggedInStatus} from '../../actions';
// import Field
import TournamentOpen from './tournament_open';
import Cookies from 'universal-cookie';

class TournamentShow extends Component{
	componentDidMount(){
		var cookies = new Cookies;

		var token = cookies.get("user");
		// this.props.getLoggedInStatus(token);
		this.props.getTournamentDetails(this.props.id);
	}

	render(){
		const {tournamentInfo} = this.props;
		let toRender;
		if(tournamentInfo.fetched){
			if(tournamentInfo.fetchSucess){
				toRender = tournamentInfo.State === 0 ? <TournamentOpen tournamentInfo={tournamentInfo} loginStatus={this.props.loginStatus} tournamentID={this.props.id} /> : "";
			}else{
				toRender = <div>Nezdařilo se získat informace o turnaji</div>
			}

		}else{
			toRender = <div>Získávám informace o turnaji, prosím čekejete.</div>
		}

		return(
			<div>
				{toRender}
			</div>
		)
	}
}

function mapStateToProps({tournamentInfo, loginStatus}){
	return {tournamentInfo, loginStatus};
}

export default connect(mapStateToProps, {getTournamentDetails, getLoggedInStatus})(TournamentShow)