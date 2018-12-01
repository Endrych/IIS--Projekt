import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getTournamentDetails, getLoggedInStatus} from '../../actions';
// import Field
import TournamentOpen from './tournament_open';
import TournamentActive from './tournament_active';
import TournamentFinished from './tournament_finished';

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
				if(tournamentInfo.State ===0){
					toRender = <TournamentOpen tournamentInfo={tournamentInfo} loginStatus={this.props.loginStatus} tournamentID={this.props.id} />;

				}else if(tournamentInfo.State === 1){
					toRender = <TournamentActive tournamentInfo={tournamentInfo} loginStatus={this.props.loginStatus} tournamentId={this.props.id} />;

				}else if(tournamentInfo.State === 2){
					toRender = <TournamentFinished tournamentInfo={tournamentInfo} loginStatus={this.props.loginStatus} tournamentId={this.props.id} />;

				}else{
					toRender = <div>Získané informace jsou poškozeny. Kontaktujte správce.</div>;

				}
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