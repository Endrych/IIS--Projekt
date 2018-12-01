import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPlayer } from '../../actions';

class UserPublicProfile extends Component{
	componentDidMount(){
		this.props.fetchPlayer(this.props.playername)
	}

	fetchSucessfull = (playerInfo) => {
		console.log(playerInfo)
		return(
			<div>
				<h2>{playerInfo.nickname}</h2>
				<div>Tým: {playerInfo.team ? playerInfo.team.Name : "Není členem žádného týmu"} </div>
				<div>Jméno: {playerInfo.firstname} {playerInfo.lastname}</div>
			</div>
		)
	}

	render(){
		const {playerInfo} = this.props;

		let toRender;
		if(playerInfo.fetched){
			if(playerInfo.fetchSucess){
				toRender = this.fetchSucessfull(playerInfo);
			}else{
				toRender = <div>Hráč nenalezen</div>;
			}
		}else{
			toRender = <div>Loading data...</div>
		}

		return(
			<div>
				{toRender}
			</div>
		)
	}
}

function mapStateToProps({playerInfo}){
	return {playerInfo};
}

export default connect(mapStateToProps, {fetchPlayer})(UserPublicProfile);