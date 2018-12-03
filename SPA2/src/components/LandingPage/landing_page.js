import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from './../Modal/modal.js';

class LandingPage extends Component{
	render(){
		return(
			<div className="row">
			{/* <Modal displayText='smazat neco' callback1={()=>{this.props.history.push("/games")}}/> */}
				Landing page
			</div>
		)
	}
}

export default connect(null)(LandingPage);