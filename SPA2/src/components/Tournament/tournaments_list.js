import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTournamentsList } from "./../../actions";


class TournamentsList extends Component{
	componentDidMount(){
		this.props.fetchTournamentsList();
	}

	render(){
		return (
			<div>
				AHOJ
			</div>
		)
	}
}

function mapStateToProps({ReducerAllTournaments}){
	return {ReducerAllTournaments};
}

export default connect(mapStateToProps, { fetchTournamentsList })(TournamentsList)