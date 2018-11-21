import React, { Component } from 'react';
import { connect } from 'react-redux';

class LandingPage extends Component{
	render(){
		return(
			<div className="row">
				Landing page
			</div>
		)
	}
}

export default connect(null)(LandingPage);