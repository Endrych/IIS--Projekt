import React, { Component } from 'react';
import { connect } from 'react-redux';


class TournamentOpen extends Component{


	render(){
		console.log(this.props);
		return(
			<div>
				SAASDASDASD
			</div>
		)
	}
}

// function mapStateToProps(state){
// 	return state;
// }

export default connect(null)(TournamentOpen)